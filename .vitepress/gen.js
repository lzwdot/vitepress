import { sync } from 'glob';
import path, { join } from 'path';
import { writeFileSync, statSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import markdown from 'markdown-it';
import dayjs from 'dayjs';

const { read, stringify } = matter;
const _dirname = path.dirname(fileURLToPath(import.meta.url));
// 全局定义
const srcDir = 'src';
const noteDir = 'note'; // note 目录
const postDir = 'post'; // post 目录

// 修改内容
const files = sync('src/note/css-layout/*');
files.forEach((file) => {
  const state = statSync(file);
  if (state.isFile() && !file.includes('README')) {
    const res = read(file);
    if (res.data?.title) {
      writeFileSync(
        file,
        stringify(`# ${res.data.title} \n ${res.content}`, {
          date: `${res.data.date}`,
        }),
      );
    }
  }
});

//============创建文档 或 博客========================
const fileType = process.argv.slice(2)[0];
if (new RegExp(`^${noteDir}|${postDir}+$`).test(fileType)) {
  createMd(fileType);
}
function createMd(fileType) {
  const matterData = {
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  };

  let dirPath = ``;
  if (fileType == postDir) {
    matterData['author'] = 'author';
    dirPath = `${fileType}/${dayjs().format('YYYY/MM')}`;
  } else {
    dirPath = fileType;
  }

  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
  //创建 md 文件
  const content = stringify('# [标题]', matterData);
  writeFileSync(`${dirPath}/example.md`, content);
}
//============创建文档 或 博客 END========================

/**
 * 更新侧边目录
 */
class AutoSidebar {
  allPosts = [];

  /**
   * 自动 sidebar
   */
  constructor(dirNames = []) {
    const sidebars = {};

    // sidebar
    dirNames.forEach((dirName) => {
      sidebars[dirName] = this.walkDir(`${srcDir}/${dirName}`);
    });
    writeFileSync(
      join(_dirname, 'data/sidebar.json'),
      JSON.stringify(sidebars),
    );
    writeFileSync(
      join(_dirname, 'data/allPost.json'),
      JSON.stringify(this.allPosts),
    );
  }

  /**
   * 递归目录
   */
  walkDir(dirName) {
    const sidebar = this.isSubNote(dirName) ? {} : [];

    if (this.excludePath(dirName)) {
      return sidebar;
    }

    const subDirs = sync(`${dirName}/*`);
    subDirs
      .sort((a, b) => this.orderBy(a, b, dirName))
      .forEach((dir) => {
        dir = dir.replaceAll('\\', '/');
        if (this.excludePath(dir)) {
          return sidebar;
        }

        const fileMatter = this.getMatter(dir);
        if (this.canWalk(dir) || this.isSubNote(dirName)) {
          const items = this.walkDir(dir);
          if (items && items.length) {
            const _obj = {
              text: fileMatter?.data?.title,
              items: items,
              collapsed: this.isPostPath(dirName),
            };
            this.isSubNote(dirName)
              ? (sidebar[`${dir.replace(srcDir, '')}`] = [_obj])
              : sidebar.push(_obj);
          }
          return sidebar;
        }

        const dirStat = statSync(dir);
        const mdLink = `${dir.replace(srcDir, '')}${dirStat.isFile() ? '' : '/index.md'}`;
        const sItem = {
          text: fileMatter?.data?.title,
          date: fileMatter?.data?.date,
          link: `${mdLink.replace('.md', '')}`,
        };
        sidebar.push(sItem);
        this.allPosts.push(sItem);
      });
    return sidebar;
  }

  /**
   * 文档子目录使用单独侧边栏
   */
  isSubNote(dirName) {
    return dirName.endsWith(noteDir);
  }

  /**
   * 是否 post 目录
   */
  isPostPath(dirName) {
    return dirName.includes(`/${postDir}`);
  }

  /**
   * 排除 readme | image | .json 路径
   */
  excludePath(dirPath) {
    dirPath = dirPath?.toLowerCase();
    return (
      dirPath.includes('readme.md') ||
      dirPath.includes('image') ||
      dirPath.includes('.json')
    );
  }

  /**
   * 读取 matter 数据
   */
  getMatter(dirPath) {
    let res = null;

    const readMe = `${dirPath}/README.md`;
    const indexMd = `${dirPath}/index.md`;

    const dirStat = statSync(dirPath);
    if (dirStat.isFile()) {
      res = read(dirPath);
    } else {
      if (existsSync(indexMd)) {
        res = read(indexMd);
      } else if (existsSync(readMe)) {
        res = read(readMe);
      } else {
        const dirSplit = dirPath.replaceAll('\\', '/').split('/');
        writeFileSync(
          readMe,
          stringify('', { title: dirSplit[dirSplit.length - 1] }),
        );

        res = read(readMe);
      }
    }

    // 可能没有 title
    if (res && !res?.data?.title && res?.content) {
      const tokens = new markdown().parse(res?.content, {});
      const index = tokens.findIndex((token) => token.tag == 'h1');

      if (index >= 0) {
        const content = tokens[index + 1]?.content;
        res.data.title = content ? this.html2Escape(content) : '';
      } else {
        res.data.title = 'No title';
      }
    }
    // 可能没有 date
    if (res && !res?.data?.date) {
      res.data['date'] = dayjs(dirStat.birthtime).format('YYYY-MM-DD HH:mm:ss');
    }

    return res;
  }

  /**
   * 能够继续 walk
   */
  canWalk(dirPath) {
    let res = false;

    const indexMd = 'index.md';
    dirPath = dirPath.replace(indexMd, '');

    const dirStat = statSync(dirPath);
    if (dirStat.isDirectory()) {
      const dirs = sync(`${dirPath}/*`);
      dirs.forEach((v) => {
        if (this.excludePath(v) || v.includes(indexMd)) {
        } else {
          res = true;
        }
      });
    }
    return res;
  }

  /**
   * html 标签转义
   */

  html2Escape(str) {
    return str.replace(/[<>&"]/g, function (c) {
      return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c];
    });
  }

  /**
   * 根据条件排序
   */
  orderBy(a, b, dirName) {
    const statA = statSync(a);
    const statB = statSync(b);

    let matterA, matterB;
    if (statA.isFile() && statB.isFile()) {
      matterA = this.getMatter(a);
      matterB = this.getMatter(b);
    }
    if (matterA?.data?.date && matterB?.data?.date) {
      a = matterA?.data?.date;
      b = matterB?.data?.date;
    }

    if (this.isPostPath(dirName)) {
      return b > a ? 1 : -1;
    } else {
      return a > b ? 1 : -1;
    }
  }
}
new AutoSidebar([postDir, noteDir]);

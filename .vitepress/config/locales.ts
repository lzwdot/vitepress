import { type DefaultTheme, type LocaleSpecificConfig } from 'vitepress';

export default {
  vars: {
    post: '博文',
    note: '笔记',
    feedback: '反馈',
  },
  config: {
    lang: 'zh-Hans',
    title: 'JS语言',
    description: '互联网 Web 技术',
  } satisfies LocaleSpecificConfig,

  themeConfig: {
    editLink: {
      pattern: 'https://github.com/lzwdot/vitepress',
      text: '在 GitHub 上编辑此页面',
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `Copyright © ${new Date().getFullYear()}-present JsLang.`,
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '页面导航',
      level: 'deep',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    notFound: {
      title: '页面未找到',
      linkLabel: '返回首页',
      linkText: '返回首页',
    },
  } satisfies DefaultTheme.Config,

  search: {
    local: {
      translations: {
        button: {
          buttonText: '搜索文档',
          buttonAriaLabel: '搜索文档',
        },
        modal: {
          noResultsText: '无法找到相关结果',
          resetButtonTitle: '清除查询条件',
          footer: {
            selectText: '选择',
            navigateText: '切换',
          },
        },
      },
    } satisfies DefaultTheme.LocalSearchOptions,
    algolia: {
      appId: 'TKXQSE9A7A',
      apiKey: 'af2fc9c5e145db634205383b2a8e4cb8',
      indexName: 'jslang',
      placeholder: '搜索文档',
      translations: {
        button: {
          buttonText: '搜索文档',
          buttonAriaLabel: '搜索文档',
        },
        modal: {
          searchBox: {
            resetButtonTitle: '清除查询条件',
            resetButtonAriaLabel: '清除查询条件',
            cancelButtonText: '取消',
            cancelButtonAriaLabel: '取消',
          },
          startScreen: {
            recentSearchesTitle: '搜索历史',
            noRecentSearchesText: '没有搜索历史',
            saveRecentSearchButtonTitle: '保存至搜索历史',
            removeRecentSearchButtonTitle: '从搜索历史中移除',
            favoriteSearchesTitle: '收藏',
            removeFavoriteSearchButtonTitle: '从收藏中移除',
          },
          errorScreen: {
            titleText: '无法获取结果',
            helpText: '你可能需要检查你的网络连接',
          },
          footer: {
            selectText: '选择',
            navigateText: '切换',
            closeText: '关闭',
            searchByText: '搜索提供者',
          },
          noResultsScreen: {
            noResultsText: '无法找到相关结果',
            suggestedQueryText: '你可以尝试查询',
            reportMissingResultsText: '你认为该查询应该有结果？',
            reportMissingResultsLinkText: '点击反馈',
          },
        },
      },
    } satisfies DefaultTheme.AlgoliaSearchOptions,
  },
};

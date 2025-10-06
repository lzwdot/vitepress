function* traverse(elList:Element[]):any{
  for(const el of elList){
    yield el

    const children = Array.from(el.children)
    if(children.length){
      yield* traverse(children)
    }
  }
}

const elList = document.getElementById('container')
if(elList){
  for(const el of traverse([elList])){
    console.log(el)
  }
}
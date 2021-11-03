// @ts-ignore
const vm = require('vm');
const user = {
  name: '<script></script>',
  age: '45'
}
const templateMap = {
  templateA: '`<h1>111->${include("templateB")}</h1>`',
  templateB: '`<span>${_(user.name)}</span>`'
}

const context = {
  include: (name) => {
    return templateMap[name]()
  },
  _: (markup) => {
    if (!markup) return ;
    return String(markup)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;')
  }
}
Object.keys(templateMap).forEach(key => {
  const temp = templateMap[key];
  templateMap[key] = vm.runInNewContext(`() => { return ${temp};}`, Object.assign(context, {user: user}))
})
console.log(templateMap['templateA']());

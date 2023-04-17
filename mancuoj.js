function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === "object" ? child : createTextElement(child)),
    }
  }
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

function render(element, container) {
  const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type)

  Object.keys(element.props)
    .filter(key => key !== "children")
    .forEach(key => {
      dom[key] = element.props[key]
    })

  element.props.children.forEach(child => {
    render(child, dom)
  })
  container.appendChild(dom)
}

const Mancuoj = {
  createElement,
  render,
}

/** @jsx Mancuoj.createElement */
const element = (
  <div id="foo">
    <h1 style="color: red;">Hello World</h1>
    <p style="color: green;">Mancuoj</p>
  </div>
)

const container = document.getElementById("root")
Mancuoj.render(element, container)
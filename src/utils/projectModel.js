export default class ProjectModel {
  constructor (props) {
    Object.keys(props).forEach((prop) => {
      this[prop] = props[prop]
    })
  }
}

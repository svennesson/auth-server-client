export default function assign (component, name) {
    return function (e) {
        component.setState({ [name]: e.target.value })
    }
}


import Anything from "testing-sk003cs";
export default function App() {
    return <Anything {...{ value: "2024-01-01", format: "YYYY/MM/DD", onChange: value => console.log(value) }} />
}
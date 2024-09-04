import {Button} from "../lib/components/Button";
import "../dist/assets/style.css"
import {ButtonBackground} from "../lib/components/Button/ButtonBackground.ts";

function App() {
  return (
    <>
        <Button bg={ButtonBackground.primary}>Button primary</Button>
        <Button bg={ButtonBackground.secondary}>Button secondary</Button>
        <Button bg={ButtonBackground.success}>Button success</Button>
        <Button bg={ButtonBackground.warning}>Button warning</Button>
        <Button bg={ButtonBackground.danger}>Button danger</Button>
    </>
  )
}

export default App

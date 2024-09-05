import {Button} from "../lib/components/Button";
import "../dist/assets/style.css"
import {ButtonBackground} from "../lib/main.ts";
import {Input} from "../lib/main.ts";

function App() {
  return (
      <>
          <div style={{display: "flex", justifyContent: "space-around"}}>
              <Button bg={ButtonBackground.primary}>Button primary</Button>
              <Button bg={ButtonBackground.secondary}>Button secondary</Button>
              <Button bg={ButtonBackground.success}>Button success</Button>
              <Button bg={ButtonBackground.warning}>Button warning</Button>
              <Button bg={ButtonBackground.danger}>Button danger</Button>
          </div>
          <div style={{display: "flex", justifyContent: "space-around", marginTop: "1rem"}}>
              <Input/>
          </div>
          </>
          )
          }

          export default App

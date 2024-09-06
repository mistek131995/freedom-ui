import "../dist/assets/style.css"
import {ButtonBackground, Input, Button, Flex, FlexJustifyContent, FlexAlignmentItems} from "../dist/main";

function App() {
  return (
      <>
          <Flex justifyContent={FlexJustifyContent.around} alignItems={FlexAlignmentItems.center}>
              <Button bg={ButtonBackground.primary}>Button primary</Button>
              <Button bg={ButtonBackground.secondary}>Button secondary</Button>
              <Button bg={ButtonBackground.success}>Button success</Button>
              <Button bg={ButtonBackground.warning}>Button warning</Button>
              <Button bg={ButtonBackground.danger}>Button danger</Button>
          </Flex>

          <div style={{display: "flex", justifyContent: "space-around", marginTop: "1rem"}}>
              <Input placeholder="text"/>
          </div>
          </>
          )
          }

          export default App

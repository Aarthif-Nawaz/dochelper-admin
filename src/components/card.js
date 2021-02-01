import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
const CardExampleExtraContent = (props) => (
  <Card>
    <Card.Content header={props.header} style={{
        backgroundColor:'#37689C',
        fontSize:'16px',
    }}/>
  </Card>
)

export default CardExampleExtraContent
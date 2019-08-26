import React from 'react';
import { Card, Image } from 'semantic-ui-react'
import imageIcon from '../assets/img/image-logo.png'

const CardTemplate = (props) => {
  return (
    <Card fluid>
      <Card.Content>
        <Image
          circular
          src={imageIcon}
          floated='left'
          size='mini'
        />
        <Card.Header>{props.name}</Card.Header>
        <Card.Meta>{props.description}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        {props.members}
      </Card.Content>
      {props.additionalElements}
    </Card>
  )
}

export default CardTemplate;
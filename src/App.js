import React, { useState, useEffect } from 'react';

import CardTemplate from './components/CardTemplate'
import NewCard from './components/NewCard';

import { Image, Grid, Container } from 'semantic-ui-react'

function App() {

  const [allMembers, addAllMembers] = useState([]);
  const [cards, addCard] = useState([]);

  useEffect(() => {
    fetch('people.json')
      .then((response) => {
        return response.json();
      })
      .then((respone) => {
        addAllMembers(respone);
      });
  }, [])

  const newCardHandler = (res) => {
    addCard([...cards, res])
  }

  const getAvatarById = (id) =>
    allMembers.find(element =>
      element.id === id
    ).avatar

  return (
    <Container style={{ marginTop: '7em' }}>
      <Grid
        padded="vertically"
        divided="vertically"
      >
        <Grid.Row columns={3}>
          {cards.map((el, i) =>
            <Grid.Column key={i}>
              <CardTemplate
                name={el.cardName}
                description={el.cardDescription}
                members={
                  <Image.Group size='mini'>
                    {el.membersIds.map(member =>
                      <Image
                        key={member}
                        src={getAvatarById(member)}
                        circular
                      />
                    )}
                  </Image.Group>
                }
              />

            </Grid.Column>
          )}
          <Grid.Column>
            <NewCard onClick={newCardHandler} allPeople={allMembers} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default App;

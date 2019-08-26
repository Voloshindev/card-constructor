import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import CardTemplate from './CardTemplate'

const NewCard = (props) => {

  const [members, setMembers] = useState([])
  const [cardName, addCardName] = useState('');
  const [cardDescription, addDescription] = useState('');
  const [membersIds, addMemberId] = useState([]);
  const [submitErrors, setSubmitErrors] = useState({})

  const { allPeople, onClick } = props;

  const resetFields = () => {
    setSubmitErrors({})
    addCardName('');
    addDescription('');
    addMemberId([]);
  }

  const handleMemberSelect = (e, { value }) => {
    addMemberId(value)
  }

  const saveHandler = (e) => {
    const errors = {
      cardName: cardName ? false : true,
      cardDescription: cardDescription ? false : true,
      membersIds: membersIds.length ? false : true
    };

    if (Object.values(errors).indexOf(true) === -1) {
      const result = {
        cardName,
        cardDescription,
        membersIds
      }

      onClick(result);
      resetFields();
    } else {
      setSubmitErrors(errors)
    }
  }

  const NameInput = (
    <Form.Input
      transparent
      value={cardName}
      error={
        submitErrors.cardName && !cardName ?
          { content: 'Please enter card name', pointing: 'below' }
          : false
      }
      placeholder='Team Name...'
      onChange={(e) => addCardName(e.target.value)}
    />
  )

  const DescriptionInput = (
    <Form.Input
      transparent
      value={cardDescription}
      error={
        submitErrors.cardDescription && !cardDescription ?
          { content: 'Please enter card description', pointing: 'below' }
          : false
      }
      placeholder='Team Description...'
      onChange={(e) => addDescription(e.target.value)}
    />
  )

  const MembersBlock = (
    <Form.Dropdown
      scrolling
      multiple
      compact
      fluid
      value={membersIds}
      error={
        submitErrors.membersIds && !membersIds.length ?
          { content: 'Please select members', pointing: 'below' }
          : false
      }
      onChange={handleMemberSelect}
      placeholder="Add team members"
      icon={false}
      options={members}
    />
  );

  useEffect(() => {
    setMembers(allPeople.map(el => ({
      key: el.id,
      text: el.name,
      value: el.id,
      image: { avatar: true, src: el.avatar }
    })))
  }, [allPeople])

  return (
    <Form onSubmit={saveHandler} >
      <CardTemplate
        name={NameInput}
        description={DescriptionInput}
        members={MembersBlock}
        additionalElements={<Button type='submit'>Save</Button>}
      />
    </Form>
  )
}

export default NewCard;
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "redux/contactsSlice";
import { getContacts } from "redux/selectors";
import { Form, Label, Input, Button } from "./ContactForm.styled";

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const onFormSubmit = e => {
    e.preventDefault();
    const contact = {
      name: e.currentTarget.elements.name.value,
      number: e.currentTarget.elements.number.value
    }

    const isExist = contacts.find(({ name }) => name.toLowerCase() === contact.name.toLowerCase());
    if (isExist) {
      alert(`${contact.name} is already in contacts.`);
      return;
    };
    
    dispatch(addContact(contact));
    e.currentTarget.reset();
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </Form>
  )
}

export default ContactForm;
import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactsBlock from 'components/ContactsBlock/ContactsBlock';
import css from '../Phonebook/Phonebook.module.css';

class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    number: '',
    name: '',
    filter: '',
  };

  handleChange = ({ target }) => {
    // console.log(target);

    const { name, value } = target; //e.target
    // console.log(name);
    // console.log(value);

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState(prevState => {
      const { name, number, contacts } = prevState;
      // Значення стейту на момент виклику превстейту, що ввели в форму і всі попередні контакти

      const normalizedName = name.toLowerCase();
      const isDublicate = contacts.find(
        contact =>
          contact.name.toLowerCase() === normalizedName &&
          contact.number === number
      );
      if (isDublicate) {
        return alert(`${name} is already in contact`);
      }

      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return { contacts: [...contacts, newContact] };

      // повертає об'єкт в якому є список старих контактів і в кінець додаємо новий
    });
    this.reset();
  };

  onDelete(id) {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  }

  reset() {
    this.setState({ name: '', number: '' });
  }

  // беремо зі стейту пусті значення ней і намбер і ресетимо поля, в інпут додаємо атрибут велью зі значеннями нейм і намбер

  getFilter() {
    const { filter, contacts } = this.state;
    const normalazedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalazedFilter);
    });

    return result;
  }

  render() {
    const { number, name } = this.state;

    // console.log(contacts);

    const contacts = this.getFilter();

    const elements = contacts.map(({ id, name, number }) => (
      <li className={css.item} key={id}>
        {name}: {number}
        <button onClick={() => this.onDelete(id)} className={css.btn}>
          Delete
        </button>
      </li>
    ));

    return (
      <div className={css.wrapper}>
        <h2 className={css.title}>Phonebook</h2>
        <div className={css.block}>
          <ContactsBlock title="Phonebook">
            <form onSubmit={this.handleSubmit} className={css.form}>
              <div className={css.formGroup}>
                <label htmlFor="">Name</label>
                <input
                  value={name}
                  onChange={this.handleChange}
                  placeholder="Contact name"
                  type="text"
                  name="name"
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                  required
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor="">Number</label>
                <input
                  value={number}
                  onChange={this.handleChange}
                  placeholder="Phone number"
                  type="tel"
                  name="number"
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                  required
                />
                <button className={css.btn} type="submit">
                  Add contact
                </button>
              </div>
            </form>
          </ContactsBlock>

          <ContactsBlock title="Contacts">
            <input
              name="filter"
              onChange={this.handleChange}
              className={css.input}
              placeholder="Find contact"
            />
            <ul className={css.list}>{elements}</ul>
          </ContactsBlock>
        </div>
      </div>
    );
  }
}

export default Phonebook;

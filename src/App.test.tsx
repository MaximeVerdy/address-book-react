import { render, screen, fireEvent, within } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import App from './App';

describe('Main Page', () => {

  it('should display contacts in alphabetical order by first name', () => {
    render(<App />);
    const contactElements = screen.getAllByTestId('firstname');
    const contactNames = contactElements.map(node => node.textContent ?? "");
    const sortedNames = [...contactNames].sort((a, b) => a.localeCompare(b));
    expect(contactNames).toEqual(sortedNames);
  });

  it('should open and close the contact form modal', () => {
    render(<App />);
    const openButton = screen.getByRole('button', { name: 'Create new contact' });
    fireEvent.click(openButton);
    expect(screen.getByText('Create a New Contact')).toBeInTheDocument();
  
    const closeButton = screen.getByRole('button', { name: 'Close new contact form' });
    fireEvent.click(closeButton);
    expect(screen.queryByText('Create a New Contact')).not.toBeInTheDocument();
  });

  it('should add a new contact', async () => {
    render(<App />);
    const openButton = screen.getByRole('button', { name: 'Create new contact' });
    fireEvent.click(openButton);
  
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Phone'), { target: { value: '0123456789' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '123 Elm Street' } });
  
    const addButton = screen.getByRole('button', { name: 'Add Contact' });
    fireEvent.click(addButton);

    await waitFor(() => {
      const firstNameDisplay = screen.queryByText('John');
      const lastNameDisplay = screen.queryByText('Doe');
      const emailDisplay = screen.queryByText('john.doe@example.com');
      const phoneDisplay = screen.queryByText('0123456789');
      const addressDisplay = screen.queryByText('123 Elm Street');
      expect(firstNameDisplay).toBeInTheDocument();
      expect(lastNameDisplay).toBeInTheDocument();
      expect(emailDisplay).toBeInTheDocument();
      expect(phoneDisplay).toBeInTheDocument();
      expect(addressDisplay).toBeInTheDocument();
    });
  });

  it('should delete a contact', () => {
    render(<App />);
    const initialContacts = screen.getAllByTestId(/^contact-/);
    expect(initialContacts.length).toBe(23);
  
    const firstContactDeleteButton = within(initialContacts[0]).getByRole('button', { name: '🗑️' });
    fireEvent.click(firstContactDeleteButton);
  
    const updatedContacts = screen.getAllByTestId(/^contact-/);
    expect(updatedContacts.length).toBe(22);
  });
  
});

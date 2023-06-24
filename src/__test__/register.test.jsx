import '@testing-library/jest-dom';
import Register from '../pages/auth/Register';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRegisterUserMutation } from "../store/api/userApi";
import { vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';

vi.mock('../store/api/userApi');


describe('If register success', () => {
  test('Register form submission', async () => {
    const mockRegisterUser = vi.fn(); // Mock the registerUser function

    useRegisterUserMutation.mockReturnValue([
      mockRegisterUser,
      { isLoading: false },
    ]);

    render(
      <Router>
        <Register/>
      </Router>
    );

    // Fill in the input fields...

    fireEvent.change(screen.getByPlaceholderText('insert username'), {
      target: { value: 'JohnDoe' },
    });

    fireEvent.change(screen.getByPlaceholderText('insert email'), {
      target: { value: 'john.doe@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('insert password'), {
      target: { value: 'password' },
    });

    fireEvent.change(screen.getByPlaceholderText('confirm password'), {
      target: { value: 'password' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Register'));

    // Wait for the registration to complete
    await waitFor(() => expect(mockRegisterUser).toHaveBeenCalled());

    // Assert the expected form values
    expect(mockRegisterUser).toHaveBeenCalledWith({
      name: 'JohnDoe',
      email: 'john.doe@example.com',
      password: 'password',
      confirmPassword: 'password',
    });
  
    expect(window.location.pathname).toBe('/');
  });
  
});

test('Register form submission - failure (password and confirm password)', async () => {
  const mockRegisterUser = vi.fn(); // Mock the registerUser function

  useRegisterUserMutation.mockReturnValue([
    mockRegisterUser,
    { isLoading: false },
  ]);

  render(
    <Router>
      <Register />
    </Router>
  );
 // Fill in the input fields...

  fireEvent.change(screen.getByPlaceholderText('insert username'), {
    target: { value: 'JohnDoe' },
  });

  fireEvent.change(screen.getByPlaceholderText('insert email'), {
    target: { value: 'test@gmail.com' }, // Provide an invalid email format
  });

  fireEvent.change(screen.getByPlaceholderText('insert password'), {
    target: { value: 'hehe' },
  });

  fireEvent.change(screen.getByPlaceholderText('confirm password'), {
    target: { value: 'password' },
  });

  // Submit the form
  fireEvent.click(screen.getByText('Register'));

  // Wait for the registration to complete
  await waitFor(() => expect(mockRegisterUser).not.toHaveBeenCalled());

  expect(screen.queryByText('Confirm Password and Password not the same')).toBeInTheDocument();
  expect(screen.queryByText('Confirm Password and Password not the same')).not.toBeNull()
});
 

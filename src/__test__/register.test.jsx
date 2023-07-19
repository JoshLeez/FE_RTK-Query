import '@testing-library/jest-dom';
import Register from '../pages/auth/Register';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as userApi from '../store/api/userApi';
import { vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';

// Use vi.spyOn to mock only the useRegisterUserMutation function
const mockRegisterUser = vi.fn();
vi.spyOn(userApi, 'useRegisterUserMutation').mockReturnValue([
  mockRegisterUser,
  { isLoading: false },
]);

describe('If register success', () => {
  test('Register form submission', async () => {
    // Use mockResolvedValue to mock the return value of the mutation function
    mockRegisterUser.mockResolvedValue({ data: { username: 'JohnDoe' }});

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
  // Use mockRejectedValue to mock the return value of the mutation function
  mockRegisterUser.mockRejectedValue(new Error('Confirm Password and Password not the same'));

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

  // Wait for the registration to fail
  await waitFor(() => expect(mockRegisterUser).toHaveBeenCalled());

  // Use await findByText instead of queryByText to avoid false positives
  expect(await screen.findByText('Confirm Password and Password not the same')).toBeInTheDocument();
});
  

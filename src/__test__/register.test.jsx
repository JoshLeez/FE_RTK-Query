import '@testing-library/jest-dom';
import Register from '../pages/auth/Register';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRegisterUserMutation } from "../store/api/userApi";
import { vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';

vi.mock('../store/api/userApi');

describe('Integration test for Register', () => {
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

    // Mock a successful registration with status code 200
    mockRegisterUser.mockResolvedValueOnce({ status: 200 });

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

    // Assert the expected status code
    expect(mockRegisterUser).toHaveReturnedWith({ status: 404 });
  });
});

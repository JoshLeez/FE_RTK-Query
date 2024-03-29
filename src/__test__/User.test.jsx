import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import User from '../pages/User';
import { useCreateUserMutation } from '../store/api/userApi';
import { Provider } from 'react-redux';
import store from '../store/store';
import { setAccessToken } from '../store/slice/authSlice';


vi.mock("../store/api/userApi", async () => {
  const actual = await vi.importActual("../store/api/userApi");
  return {
    ...actual,
    useGetUsersQuery : vi.fn().mockReturnValue({
      isLoading : false,
    }),
    useCreateUserMutation: vi.fn(),
  };
});


describe('testing CREATE user', () => {
  test('should create a new user', async () => {
    const createUserMock = vi.fn();

    useCreateUserMutation.mockReturnValue([
      createUserMock,
      { isLoading: false, isError: false, error: null },
    ]);

    store.dispatch(setAccessToken('your-mock-token'));

    render(
      <Provider store={store}>
        <Router>
          <User />
        </Router>
      </Provider>
    );

    
    await waitFor(() => {
      expect(screen.getByText(/Add User/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/insert name/i), {
      target: { value: 'Precious' },
    });
    fireEvent.change(screen.getByPlaceholderText(/insert Email/i), {
      target: { value: 'golum@gmail.com' },
    });
    fireEvent.change(screen.getByTestId(/select-option/i), {
      target: { value: 'Male' },
    });

    fireEvent.click(screen.getByText(/Add User/i));

    await waitFor(() => expect(createUserMock).toHaveBeenCalled());

    expect(createUserMock).toHaveBeenCalledWith({
      name: 'Precious',
      email: 'golum@gmail.com',
      gender: 'Male',
    });
  });
});

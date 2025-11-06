import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import App from '../App'
import { store } from '../store'

test('renders hero headline', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(screen.getByText(/Signature escapes across flights/i)).toBeInTheDocument()
})

import './App.css'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'

/**
 * Render the main application UI and Clerk authentication controls.
 *
 * Renders a header and Clerk components that conditionally show sign-in or sign-out controls:
 * when the user is signed out, a modal SignInButton labeled "Log In" is shown; when signed in,
 * a SignOutButton is shown. A UserButton is always rendered.
 *
 * @returns {JSX.Element} The app's root React element containing the header and authentication UI.
 */
function App() {
  return (
    <>
      <h1>Welcome to CodeMeet</h1>

      <SignedOut>
        <SignInButton mode="modal">
          <button>Log In</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <UserButton/>
    </>
  )
}

export default App;
import { Link } from 'react-router-dom';
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react';

export const Navigation = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#2c5282',
      color: 'white',
      marginBottom: '2rem'
    }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Pixell River Financial</h1>
        
        <SignedIn>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link 
              to="/employees" 
              style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}
            >
              Employees
            </Link>
            <Link 
              to="/organization" 
              style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}
            >
              Organization
            </Link>
          </div>
        </SignedIn>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Show Sign In button when signed out */}
        <SignedOut>
          <SignInButton mode="modal">
            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'white',
              color: '#2c5282',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        {/* Show User button with sign out when signed in */}
        <SignedIn>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: {
                  width: '40px',
                  height: '40px'
                }
              }
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
};
Notes:

- I'm using a signal in the AuthStore that clients can subscribe to for information about the
  authentication process. In a previous project, we stored the authentication state in the AuthStore but
  this has the problem that the AuthStore does not know exactly what status information the clients require: there
  were some authentication steps that for some clients indicate a status change, but not for other clients. When
  the information is sent in a signal, each client can subscribe and filter the information itself. The SignUp page
  uses the AuthState class (that is connected to the signal in the AuthStore) as additional state about the auth process.

- In the sign-in page I'm using a custom hook called useNextUrl. This hook conditionally changes the url (in our case:
  to the /characters page), where the condition is that the auth state equals SignIn.Succeeded. I like to use these custom
  hooks to make the code more expressive.

- The sign up and sign in forms check the response code of the graphql backend. Currently, this is only done for invalid
  login credentials, signing up again with the same email address and for signing up with an invalid email address.

- I try to put every concern into its own "feature" directory. There is not strict rule for what counts as a separate concern,
  but it usually corresponds to a statement such as "the app has to deal with authentication" (/src/auth), or
  "the app shows characters" (/src/characters).

- Every component has its own scss file that gets included in the components/index.scss file of the feature directory.
  There is a root index.scss file that includes the components/index.scss file for every feature directory.

- I used my libraries called aspiration (dealing with aspect oriented programming) and skandha (dealing with reusable
  behaviours called facets) to add selection and filtering. Logging is enabled so you can easily see facet state changes
  in the browser. The filtering widget itself could also become a reusable component (it only deals with filtering, not
  with anything "characters" specific).

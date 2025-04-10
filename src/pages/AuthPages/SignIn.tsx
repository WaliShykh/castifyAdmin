import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Sign In - Castify Admin"
        description="Sign in to your Castify Admin account"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignupForm from "./signup-form";

export default function Signup() {
  return (
    <main className="grid place-items-center w-full p-4">
      <Card className="bg-secondary border-none shadow-lg px-8 py-6 max-w-3xl rounded-2xl w-full">
        <CardHeader>
          <CardTitle className="text-center text-4xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <SignupForm />
        </CardContent>
      </Card>
    </main>
  );
}

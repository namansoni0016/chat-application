import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { IoChatbox } from "react-icons/io5";

export default function SignupPage() {
    return (
        <>
            <div className="flex h-screen w-full items-center justify-center bg-green-700 px-4">
                <Card className="w-full max-w-md shadow-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold">
                            <div className="border rounded-full p-2 bg-green-50">
                                <IoChatbox className="text-green-700" />
                            </div>
                            Create Account
                        </CardTitle>
                        <CardDescription className="text-center">Get started with your account</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-4">
                        <div className="flex flex-col gap-y-2">
                            <Label>Full Name</Label>
                            <Input placeholder="John Doe" required/>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Phone Number</Label>
                            <Input placeholder="+919999999999" required/>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Email</Label>
                            <Input placeholder="johndoe@email.com" required/>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Password</Label>
                            <Input type="password" placeholder="******" required/>
                        </div>
                        <Button className="bg-green-700 font-bold">Sign Up</Button>
                        <div className="text-center">
                            <p className="text-muted-foreground">
                                Already have an account?
                                <Button variant="link" className="pl-2">
                                    <Link href="/login">Log In</Link>
                                </Button>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
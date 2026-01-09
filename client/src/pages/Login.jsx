

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"



const Login = () => {

    // setting up the data handlers
    const [loginInput, setLoginInput] = useState({ email: "", password: "" });
    const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });

    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignupInput({ ...signupInput, [name]: value });
        } else {
            setLoginInput({ ...loginInput, [name]: value });
        }
    }

    const handleRegistration = (type) => {
        const inputData = type === "signup" ? signupInput : loginInput;
        console.log(inputData);
    }


    // UI part of the login/signUp field
    return (
        <div className="flex items-center w-full justify-center">
            <div className="flex w-full max-w-sm flex-col gap-6 ">

                <Tabs defaultValue="signup">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signup">Signup</TabsTrigger>
                        <TabsTrigger value="login">Login</TabsTrigger>
                    </TabsList>

                    {/* sign up */}
                    <TabsContent value="signup">
                        <Card>
                            <CardHeader>
                                <CardTitle>Signup</CardTitle>
                                <CardDescription>
                                    Create a new account to proceed to the platform
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-name">Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={signupInput.name}
                                        onChange={(e) => { changeInputHandler(e, "signup") }}
                                        placeholder="enter you full name"
                                        required />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-username">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={signupInput.email}
                                        onChange={(e) => { changeInputHandler(e, "signup") }}
                                        placeholder="enter your email"
                                        required />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-username">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={signupInput.password}
                                        onChange={(e) => { changeInputHandler(e, "signup") }}
                                        placeholder="enter a strong password"
                                        required />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => handleRegistration("signup")}>Signup</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Login Field */}
                    <TabsContent value="login">
                        <Card>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>
                                    Login with user credentials to proceed to the platform
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-current">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={loginInput.email}
                                        onChange={(e) => { changeInputHandler(e, "login") }}
                                        placeholder="enter your email"
                                        required />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-new">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={loginInput.password}
                                        onChange={(e) => { changeInputHandler(e, "login") }}
                                        placeholder="enter your password"
                                        required />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => handleRegistration("login")}>Login</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    )
}

export default Login

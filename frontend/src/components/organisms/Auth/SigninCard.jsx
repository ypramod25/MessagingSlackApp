import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Separator } from '@/components/ui/separator';
import { LucideLoader2, TriangleAlert } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

export const SigninCard = ({
    signinForm,
    setSigninForm,
    onSigninFormSubmit,
    validationError,
    error,
    isSuccess,
    isPending
}) => {
    
    const navigate = useNavigate();

    return (
        <>
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Sign in to access your account.</CardDescription>
                {validationError && (
                    <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                        <TriangleAlert className="size-5" />
                        <p>{validationError.message}</p>
                    </div>
                )}

                {error && (
                    <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                        <TriangleAlert className="size-5" />
                        <p>{error.message}</p>
                    </div>
                )}

                {isSuccess && (
                    <div className="bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary mb-5">
                        <FaCheck className="size-5" />
                        <p>
                            Successfully logged in. You will be redirected to home page.
                            <LucideLoader2 className="animate-spin"/> 
                        </p>
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <form className="space-y-4" onSubmit={onSigninFormSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            disabled={isPending}
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={signinForm.email}
                            onChange={(e) => setSigninForm({...signinForm, email: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            disabled={isPending}
                            id="password"
                            type="password"  
                            placeholder="••••••••"
                            value={signinForm.password}
                            onChange={(e) => setSigninForm({...signinForm, password: e.target.value})}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={false} size="lg">
                        Sign In
                    </Button>
                </form>

                <Separator className ="my-5"/>
                <p className="text-sm text-muted-foreground text-center">
                    Don't have an account?{' '}
                    <span 
                        className="text-sky-600 hover:underline cursor-pointer " 
                        onClick={() => navigate('/auth/signup')}
                    >
                        Sign Up
                    </span>
                </p>
            </CardContent>
        </Card>
        </>
    )
}
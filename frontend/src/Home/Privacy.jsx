import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
            
            <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>1. Information We Collect</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">
                            We collect information you provide directly to us, including:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                            <li>Personal identification information (Name, email address, phone number)</li>
                            <li>Demographic information</li>
                            <li>Usage data and interaction with our services</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>2. How We Use Your Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Process transactions and send related information</li>
                            <li>Send you technical notices, updates, security alerts</li>
                            <li>Respond to your comments, questions, and requests</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>3. Information Sharing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">
                            We do not sell your personal information. We may share information with:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                            <li>Service providers and business partners</li>
                            <li>Legal and regulatory requirements</li>
                            <li>Protection of our rights and safety</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>4. Your Rights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                            <li>Access your personal information</li>
                            <li>Request correction of your data</li>
                            <li>Request deletion of your data</li>
                            <li>Opt-out of marketing communications</li>
                        </ul>
                    </CardContent>
                </Card>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-600 text-sm">
                        Last Updated: {new Date().toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                        Contact us at privacy@company.com for any privacy-related questions.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Privacy;
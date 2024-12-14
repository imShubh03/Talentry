import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Terms of Service</h1>
            
            <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>1. Acceptance of Terms</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">
                            By accessing or using our service, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our service.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>2. User Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>You must provide accurate and complete information when creating an account.</li>
                            <li>You are responsible for maintaining the confidentiality of your account and password.</li>
                            <li>You agree to accept responsibility for all activities that occur under your account.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>3. User Conduct</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 mb-2">
                            When using our service, you agree NOT to:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>Violate any local, state, national, or international law</li>
                            <li>Transmit any content that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, or invasive of another's privacy</li>
                            <li>Interfere with or disrupt our service or servers</li>
                            <li>Attempt to gain unauthorized access to any portion of the service</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>4. Intellectual Property</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">
                            All content on this service, including text, graphics, logos, and software, is the property of our company and is protected by intellectual property laws.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                            <li>You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material</li>
                            <li>Limited license is granted to view and use the service for personal, non-commercial purposes only</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>5. Limitation of Liability</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">
                            Our service is provided "as is" and "as available" without any warranties of any kind, either express or implied.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                            <li>We are not liable for any direct, indirect, incidental, special, or consequential damages</li>
                            <li>Our total liability is limited to the amount you have paid us in the last six months</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>6. Termination</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">
                            We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                            <li>Violation of these Terms of Service</li>
                            <li>Unauthorized use of the service</li>
                            <li>Conduct that we believe is inappropriate</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>7. Changes to Terms</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">
                            We reserve the right to modify these Terms of Service at any time. 
                            Changes will be effective immediately upon posting to the service.
                        </p>
                    </CardContent>
                </Card>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-600 text-sm">
                        Last Updated: {new Date().toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                        Questions about our Terms? Contact us at legal@company.com
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TermsOfService;
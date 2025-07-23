import * as React from 'react';
import {
    Body,
    Container,
    Font,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";

export default function VerificationEmail({
    firstname,
    lastname,
}: {
    firstname: string;
    lastname: string;
}) {
    return (
        <Html>
            <Head>
                <title>Form Registered</title>
                <Font
                    fontFamily="Inter"
                    fontWeight={400}
                    fontStyle="normal"
                    fallbackFontFamily="Arial"
                />
            </Head>
            <Preview>Thank you for submitting the form</Preview>
            <Section>
                <Row>
                    {" "}
                    <Heading as="h2">Hello {firstname + " " + lastname}</Heading>
                </Row>
                <Row>
                    {" "}
                    <Text>
                        Thank you for submitting the form.
                    </Text>
                </Row>
                <Row>
                    <Text> We will get back to you soon.</Text>
                </Row>
            </Section>
        </Html>
    );
}

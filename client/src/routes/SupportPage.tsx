import React, { useState } from 'react';
import { MainLayout } from '../components/MainLayout/MainLayout';
import { Box, Flex } from 'reflexbox';
import emailjs from 'emailjs-com';
import { Button, Input, Typography } from 'antd';
const { Text, Title, Paragraph } = Typography;

const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID || '';
const SERVICE_ID = process.env.REACT_APP_SERVICE_ID || '';
const USER_ID = process.env.REACT_APP_USER_ID || '';

export function SupportPage({ location }: any) {
    const [content, setContent] = useState('');
    const [contentError, setContentError] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [email, setEmail] = useState('');

    const changeContent = e => {
        const { value } = e.target;
        setContent(value);
    };

    const changeEmail = e => {
        const { value } = e.target;
        setEmail(value);
    };

    const sendForm = async () => {
        if (!content) {
            setContentError(true);
            return;
        }
        const templateParams = { reply_to: email, message: content };
        try {
            setIsSending(true);
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
            setEmailSent(true);
            setContent('');
            setContentError(false);
        } catch (err) {
            alert('Email send error! ' + (err.text ? err.text : err.toString()));
        }
        setIsSending(false);
    };

    return (
        <MainLayout location={location}>
            <Box p={4} width={0.5}>
                <Title level={3}>Contact Me</Title>
                <Paragraph>
                    Feel free to contact if you have any problems or feature requests. Or if you
                    have any feedback to give - good or bad.
                </Paragraph>
                <Flex p={1}>
                    <Input.TextArea
                        value={content}
                        placeholder="Content"
                        onChange={changeContent}
                        rows={4}
                    />
                </Flex>
                {contentError && (
                    <Flex p={1}>
                        <Text>Content is empty!</Text>
                    </Flex>
                )}
                <Flex p={1}>
                    <Input
                        value={email}
                        placeholder="E-mail (If you need feedback)"
                        onChange={changeEmail}
                    />
                </Flex>
                <Flex p={1}>
                    <Button type="primary" onClick={sendForm} disabled={isSending}>
                        Send
                    </Button>
                </Flex>
                {emailSent && (
                    <Flex p={1}>
                        <Text>Email is sent!</Text>
                    </Flex>
                )}
            </Box>
            <Box p={4} width={0.5}>
                <Title level={3}>Support Tockler</Title>
                <Paragraph>
                    This app is made in my own free time and often at expense of family, friends,
                    and sleep. I would like to keep this app free, open-source, and improving over
                    time. But for that, your support is needed.
                </Paragraph>
                <Paragraph>
                    It is understandable if you can't give anything. You can always give some
                    constructive feedback.
                </Paragraph>
                <Paragraph>
                    So if you find this app useful then feel free to donate. Anything helps to keep
                    this app up to date and always improving. I don't plan to get rich with that,
                    need to justify working on this.
                </Paragraph>
                <Flex p={1}>
                    <Box p={2}>
                        <a
                            href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=JAHHBZZCZVDMA"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <img
                                src="https://github.com/MayGo/tockler/raw/master/badges/Donate-PayPal-green.svg"
                                alt="Donate using PayPal"
                                style={{ maxWidth: '100%' }}
                            />
                        </a>
                    </Box>
                    <Box p={2}>
                        <a
                            href="https://github.com/sponsors/maygo/"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <img
                                src="https://github.com/MayGo/tockler/raw/master/badges/GitHub-Badge.svg"
                                alt="Sponsor on GitHub"
                                style={{ maxWidth: '100%' }}
                            />
                        </a>
                    </Box>
                    <Box p={2}>
                        <a href="https://www.patreon.com/Tockler" rel="noreferrer" target="_blank">
                            <img
                                src="https://github.com/MayGo/tockler/raw/master/badges/Patreon-Badge.svg"
                                alt="Become a patron"
                                style={{ maxWidth: '100%' }}
                            />
                        </a>
                    </Box>
                </Flex>
            </Box>
        </MainLayout>
    );
}
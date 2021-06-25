import React from 'react';
import { MainLayout } from '../components/MainLayout/MainLayout';
import { SummaryCalendar } from '../components/SummaryCalendar/SummaryCalendar';
import { SummaryProvider } from '../SummaryContext';
import { LineChart } from '../components/LineCharts/LineChart';
import { VStack } from '@chakra-ui/react';
import { CardBox } from '../components/CardBox';

export function SummaryPage({ location }: any) {
    return (
        <MainLayout location={location}>
            <SummaryProvider>
                <VStack p={4} spacing={4}>
                    <CardBox p={0} position="relative" overflow="hidden">
                        <SummaryCalendar />
                    </CardBox>
                    <CardBox position="relative" title="Online time" divider>
                        <LineChart />
                    </CardBox>
                </VStack>
            </SummaryProvider>
        </MainLayout>
    );
}

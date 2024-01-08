"use client";
import { Flex } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import PieChart from './PieChart'
import CategoriesList from './CategoriesList'
import useIsMobile from '@/hooks/useIsMobile'
import { useMyDataContext } from '@/contexts/DataContext';

interface Props {
  type: string;
}

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: string;
  budget: string;
  tags: string[];
}

interface DataPoint {
  y: number;
  label: string;
  percentage: number;
}

const ThreeStats = ({ type }: Props) => {
  const isMobile = useIsMobile();
  const { dataToShow } = useMyDataContext();
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  useEffect(() => {
    if (dataToShow.length) {
      setDataPoints(transformData(dataToShow, type));
    }
  }, [dataToShow])

  useEffect(() => {
    console.log('Datapoints', dataToShow, dataPoints)
  }, [dataPoints])

  function transformData(originalData: Transaction[], type: string): DataPoint[] {
    const transformedData: Record<string, { sum: number, percentage: number }> = {};
    originalData.forEach(item => {
      const category = item.category;
      let amount = item.amount;
      const itemType = item.type;

      if (itemType !== "Income") {
        amount = amount * -1;
      }

      if (type === itemType) {
        if (transformedData[category]) {
          transformedData[category].sum += amount;
        } else {
          transformedData[category] = { sum: amount, percentage: 0 };
        }
      }
    });

    const totalSum = Object.values(transformedData).reduce((acc, category) => acc + category.sum, 0);

    Object.keys(transformedData).forEach(category => {
      transformedData[category].percentage = (transformedData[category].sum / totalSum) * 100;
    });

    const result: DataPoint[] = Object.keys(transformedData).map(label => ({
      y: transformedData[label].sum,
      label: label,
      percentage: parseFloat(transformedData[label].percentage.toFixed(1)),
    }));

    return result;
  }


  return (
    <Flex flexDir='column' overflow="scroll">
      <PieChart type={type} dataPoints={dataPoints} />
      <CategoriesList type={type} dataPoints={dataPoints} />
    </Flex>
  )
}

export default ThreeStats
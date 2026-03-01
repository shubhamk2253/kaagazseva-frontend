import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

/**
 * KAAGAZSEVA - Founder's Revenue Analysis Chart
 * This component visualizes the Gross Merchandise Value (GMV).
 */

interface RevenueData {
  date: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            {/* Professional Blue Gradient for the Area fill */}
            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#f0f0f0" 
          />
          
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#9ca3af' }} 
            dy={10}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            tickFormatter={(value) => `₹${value ?? 0}`}
          />
          
          <Tooltip 
            cursor={{ stroke: '#2563eb', strokeWidth: 1, strokeDasharray: '5 5' }}
            formatter={(value) => {
              if (typeof value !== 'number') {
                return ['₹0', 'Revenue'];
              }
              return [formatCurrency(value), 'Revenue'];
            }}
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              padding: '12px' 
            }}
          />
          
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#2563eb" 
            fillOpacity={1} 
            fill="url(#colorRev)" 
            strokeWidth={3}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
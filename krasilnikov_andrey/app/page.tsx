
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar
} from "recharts";
import { motion } from "framer-motion";

const scenarioData = [
  { name: "Relief", value: 28 },
  { name: "Tighten", value: 55 },
  { name: "StatusQuo", value: 17 },
];

const timelineData = [
  { horizon: "1m", Relief: 3, Tighten: 11 },
  { horizon: "3m", Relief: 7, Tighten: 24 },
  { horizon: "6m", Relief: 14, Tighten: 38 },
  { horizon: "1y", Relief: 28, Tighten: 55 },
  { horizon: "3y", Relief: 46, Tighten: 41 },
  { horizon: "5y", Relief: 58, Tighten: 31 },
  { horizon: "10y", Relief: 72, Tighten: 18 },
];

const geoRiskData = [
  { location: "Moscow", weight: 25 },
  { location: "Ekaterinburg", weight: 45 },
  { location: "UAE", weight: 10 },
  { location: "Thailand", weight: 10 },
  { location: "Bali", weight: 10 },
];

const sanctionImpactData = [
  { level: "Low", Equities: -5, RealEstate: -2 },
  { level: "Medium", Equities: -15, RealEstate: -8 },
  { level: "High", Equities: -30, RealEstate: -18 },
];

// Monthly change in Tighten probability (extended 12 months forward)
const regimeShiftData = [
  { month: "Jan", change: 1.2 },
  { month: "Feb", change: 2.1 },
  { month: "Mar", change: 3.4 },
  { month: "Apr", change: 4.8 },
  { month: "May", change: 5.2 },
  { month: "Jun", change: 5.8 },
  { month: "Jul", change: 6.1 },
  { month: "Aug", change: 6.4 },
  { month: "Sep", change: 6.8 },
  { month: "Oct", change: 7.1 },
  { month: "Nov", change: 7.5 },
  { month: "Dec", change: 7.9 },
];

// Secondary Sanctions Risk (1Y probability, simple and clear)
const secondarySanctionsData = [
  { country: "Moscow", risk: 65, fill: "#0072CE" },   // blue
  { country: "Ekaterinburg", risk: 60, fill: "#00A65A" }, // green
  { country: "Bali", risk: 15, fill: "#F59E0B" },     // yellow
  { country: "Thailand", risk: 25, fill: "#6B7280" }, // grey
  { country: "UAE", risk: 30, fill: "#D32F2F" },      // red
];

const COLORS = ["#00A65A", "#D32F2F", "#6B7280"];

const tooltipStyle = {
  backgroundColor: "#111827",
  border: "1px solid #2A2F36",
  color: "#F3F4F6",
};

export default function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#000000] text-[#F3F4F6] min-h-screen">
      {/* Scenario Distribution */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card className="bg-[#111827] rounded-2xl shadow-xl">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4 text-white">
              Scenario Distribution (1Y)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scenarioData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {scenarioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Probability Timeline */}
      <Card className="bg-[#111827] rounded-2xl shadow-xl">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-white">
            Probability Timeline
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid stroke="#2A2F36" strokeDasharray="3 3" />
              <XAxis dataKey="horizon" stroke="#F3F4F6" />
              <YAxis stroke="#F3F4F6" tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ color: "#F3F4F6" }} />
              <Line type="monotone" dataKey="Relief" stroke="#00A65A" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Tighten" stroke="#D32F2F" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Geo Risk Exposure */}
      <Card className="bg-[#111827] rounded-2xl shadow-xl">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-white">
            Geo Risk Exposure
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={geoRiskData}
                dataKey="weight"
                nameKey="location"
                outerRadius={110}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {geoRiskData.map((entry, index) => (
                  <Cell
                    key={`geo-${index}`}
                    fill={["#0072CE", "#00A65A", "#D32F2F", "#6B7280", "#F59E0B"][index % 5]}
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Asset Reaction */}
      <Card className="bg-[#111827] rounded-2xl shadow-xl">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-white">
            Asset Reaction Under Sanctions Escalation
          </h2>
          <div className="mb-4 text-sm text-[#9CA3AF]">
            X-axis = sanction intensity (Low / Medium / High). Y-axis = expected drawdown in percent. If escalation increases, equities fall more than real estate.
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sanctionImpactData}>
              <CartesianGrid stroke="#2A2F36" strokeDasharray="3 3" />
              <XAxis dataKey="level" stroke="#F3F4F6" />
              <YAxis stroke="#F3F4F6" tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ color: "#F3F4F6" }} />
              <Line type="monotone" dataKey="Equities" stroke="#D32F2F" strokeWidth={3} />
              <Line type="monotone" dataKey="RealEstate" stroke="#00A65A" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Wall */}
      <Card className="bg-[#0B0F14] rounded-2xl shadow-xl border-2 border-[#2A2F36] lg:col-span-2">
        <CardContent>
          <h2 className="text-3xl font-bold mb-6 text-white">Risk Wall</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            <div className="bg-[#1A1F27] p-3 rounded-xl flex justify-between text-sm">
              <span className="text-[#E5E7EB] font-medium">Base Regime</span>
              <span className="text-[#00FF88] font-bold">Tighten</span>
            </div>
            <div className="bg-[#1A1F27] p-3 rounded-xl flex justify-between text-sm">
              <span className="text-[#E5E7EB] font-medium">P(Tighten 1Y)</span>
              <span className="text-[#FF3B30] font-bold">55%</span>
            </div>
            <div className="bg-[#1A1F27] p-3 rounded-xl flex justify-between text-sm">
              <span className="text-[#E5E7EB] font-medium">P(Relief 1Y)</span>
              <span className="text-[#00A65A] font-bold">28%</span>
            </div>
            <div className="bg-[#1A1F27] p-3 rounded-xl flex justify-between text-sm">
              <span className="text-[#E5E7EB] font-medium">VaR 95%</span>
              <span className="text-[#FF3B30] font-bold">-19%</span>
            </div>
            <div className="bg-[#1A1F27] p-3 rounded-xl flex justify-between text-sm">
              <span className="text-[#E5E7EB] font-medium">CVaR 95%</span>
              <span className="text-[#FF3B30] font-bold">-27%</span>
            </div>
            <div className="bg-[#1A1F27] p-3 rounded-xl flex justify-between text-sm">
              <span className="text-[#E5E7EB] font-medium">Max Drawdown</span>
              <span className="text-[#FF3B30] font-bold">-34%</span>
            </div>
            <div className="bg-[#1A1F27] p-3 rounded-xl flex justify-between text-sm">
              <span className="text-[#E5E7EB] font-medium">Expected Time to Relief</span>
              <span className="text-[#E5E7EB] font-bold">4.6Y</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Tighten Risk Increase */}
      <Card className="bg-[#111827] rounded-2xl shadow-xl">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-white">
            Monthly Increase in Tighten Risk (percentage points)
          </h2>
          <div className="mb-4 text-sm text-[#9CA3AF]">
            Shows how many percentage points Tighten probability increased each month.
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={regimeShiftData}>
              <CartesianGrid stroke="#2A2F36" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#F3F4F6" />
              <YAxis stroke="#F3F4F6" tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="change" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Secondary Sanctions Risk */}
      <Card className="bg-[#111827] rounded-2xl shadow-xl">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-white">
            Secondary Sanctions Risk (1Y Probability %)
          </h2>
          <div className="mb-4 text-sm text-[#9CA3AF]">
            Probability of secondary sanctions impact by jurisdiction. Higher bar = higher exposure risk.
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={secondarySanctionsData}>
              <CartesianGrid stroke="#2A2F36" strokeDasharray="3 3" />
              <XAxis dataKey="country" stroke="#F3F4F6" />
              <YAxis stroke="#F3F4F6" tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="risk">
                {secondarySanctionsData.map((entry, index) => (
                  <Cell key={`cell-sec-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

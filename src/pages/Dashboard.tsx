import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import mqtt from "mqtt";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

interface DataPoint {
  timestamp: string;
  temperature: number;
  humidity: number;
}

const menuItems = [
  "Temperature",
  "Humidity",
  "Graph",
  "Silkworm Stages",
  "Environment Status",
  "System Alerts",
  "Device Control",
];

// 3D background GIF URL
const background3D =
  "https://i.pinimg.com/originals/44/a3/90/44a39038a2420091fa89e697f996feae.gif";

export default function Dashboard() {
  const [active, setActive] = useState("Temperature");
  const [temperature, setTemperature] = useState(27);
  const [humidity, setHumidity] = useState(80);
  const [history, setHistory] = useState<DataPoint[]>([]);
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);

  // MQTT connection
  useEffect(() => {
    const c = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
    setClient(c);

    c.on("connect", () => {
      c.subscribe("farm/temperature");
      c.subscribe("farm/humidity");
    });

    c.on("message", (topic, msg) => {
      const val = parseFloat(msg.toString());
      if (topic === "farm/temperature") setTemperature(val);
      if (topic === "farm/humidity") setHumidity(val);

      setHistory((prev) => {
        const lastTemp = prev[prev.length - 1]?.temperature ?? temperature;
        const lastHum = prev[prev.length - 1]?.humidity ?? humidity;

        const newPoint = {
          timestamp: new Date().toLocaleTimeString(),
          temperature: topic === "farm/temperature" ? val : lastTemp,
          humidity: topic === "farm/humidity" ? val : lastHum,
        };

        return [...prev.slice(-47), newPoint]; // Keep last 48 points
      });
    });

    return () => c.end();
  }, []);

  // --- Card Components ---
  const TemperatureCard = () => (
    <Card sx={{ maxWidth: 600, width: "100%", p: 2, bgcolor: "rgba(0, 0, 0, 0.9)" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Temperature
        </Typography>
        <AnimatePresence mode="wait">
          <motion.div
            key={temperature}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h2" color="primary">
              {temperature.toFixed(1)}°C
            </Typography>
          </motion.div>
        </AnimatePresence>
        <Chip
          sx={{ mt: 2 }}
          label={temperature >= 24 && temperature <= 28 ? "Optimal" : "Check"}
          color={temperature >= 24 && temperature <= 28 ? "success" : "warning"}
        />
      </CardContent>
    </Card>
  );

  const HumidityCard = () => (
    <Card sx={{ maxWidth: 600, width: "100%", p: 2, bgcolor: "rgba(9, 8, 8, 0.9)" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Humidity
        </Typography>
        <AnimatePresence mode="wait">
          <motion.div
            key={humidity}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h2" color="secondary">
              {humidity.toFixed(1)}%
            </Typography>
          </motion.div>
        </AnimatePresence>
        <Chip
          sx={{ mt: 2 }}
          label={humidity >= 70 && humidity <= 90 ? "Optimal" : "Check"}
          color={humidity >= 70 && humidity <= 90 ? "success" : "warning"}
        />
      </CardContent>
    </Card>
  );

  const GraphSection = () => (
    <Card sx={{ width: "100%", height: 420, p: 2 }}>
      <CardContent sx={{ height: "100%" }}>
        <Typography variant="h5" mb={2}>
          Temperature & Humidity Trend
        </Typography>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={history.length ? history : [{ timestamp: "", temperature: 0, humidity: 0 }]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#ff7300"
              dot={false}
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#3874ff"
              dot={false}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const Stages = () => {
    const stages = [
      { name: "1st & 2nd Instar", temp: "26–28°C", hum: "85–90%", current: false },
      { name: "3rd Instar", temp: "25–27°C", hum: "80–85%", current: false },
      { name: "4th Instar", temp: "24–26°C", hum: "75–80%", current: true },
      { name: "5th Instar", temp: "23–25°C", hum: "70–75%", current: false },
    ];

    return (
      <Stack spacing={2} width="100%" maxWidth={700}>
        {stages.map((s) => (
          <Box
            key={s.name}
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid rgb(233, 238, 247)",
              bgcolor: s.current ? "rgba(10, 10, 11, 0.1)" : "white",
              color: s.current ? "white" : "black",
              fontWeight: s.current ? "bold" : "normal",
            }}
          >
            <Typography variant="h6">
              {s.name} {s.current && "(Current)"}
            </Typography>
            <Typography variant="body2">Temperature: {s.temp}</Typography>
            <Typography variant="body2">Humidity: {s.hum}</Typography>
          </Box>
        ))}
      </Stack>
    );
  };

  const EnvStatus = () => {
    const tempOk = temperature >= 24 && temperature <= 28;
    const humOk = humidity >= 70 && humidity <= 90;

    const statusBox = (label: string, value: boolean) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          minWidth: 150,
          borderRadius: 2,
          bgcolor: value ? "rgba(34,197,94,0.15)" : "rgba(220,38,38,0.15)",
          border: `2px solid ${value ? "#22c55e" : "#dc2626"}`,
          boxShadow: value
            ? "0 0 10px rgba(34,197,94,0.3)"
            : "0 0 10px rgba(220,38,38,0.3)",
          transition: "all 0.3s ease",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {label}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: value ? "#16a34a" : "#b91c1c",
            fontWeight: "bold",
          }}
        >
          {value ? "OK" : "Alert"}
        </Typography>
      </Box>
    );

    return (
      <Stack direction="row" spacing={3}>
        {statusBox("Temperature", tempOk)}
        {statusBox("Humidity", humOk)}
      </Stack>
    );
  };

  const Alerts = () => {
    const items = [
      { txt: "Temperature exceeds range", type: "warning" },
      { txt: "Sensor disconnected", type: "error" },
      { txt: "Humidity stable", type: "success" },
    ];
    return (
      <Card sx={{ maxWidth: 500, bgcolor: "rgba(49, 40, 185, 0.9)" }}>
        <CardContent>
          <Typography variant="h5" mb={2}>
            System Alerts
          </Typography>
          {items.map((a, i) => (
            <React.Fragment key={i}>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                {a.type === "warning" && <WarningAmberIcon color="warning" />}
                {a.type === "error" && <ErrorIcon color="error" />}
                {a.type === "success" && <CheckCircleIcon color="success" />}
                <Typography>{a.txt}</Typography>
              </Stack>
              {i < items.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    );
  };

  const Devices = () => {
    const devices = [
      { name: "Exhaust Fan", cmd: "FAN" },
      { name: "Heater", cmd: "HEATER" },
      { name: "Humidifier", cmd: "HUMIDIFIER" },
      { name: "Air Cooler", cmd: "COOLER" },
    ];
    const send = (cmd: string) => client?.publish("farm/device", cmd);
    return (
      <Stack spacing={2} maxWidth={500}>
        {devices.map((d) => (
          <Stack
            key={d.name}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>{d.name}</Typography>
            <Stack direction="row" spacing={1}>
              <Button variant="contained" onClick={() => send(`${d.cmd}_ON`)}>
                ON
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => send(`${d.cmd}_OFF`)}
              >
                OFF
              </Button>
            </Stack>
          </Stack>
        ))}
      </Stack>
    );
  };

  const renderContent = () => {
    switch (active) {
      case "Temperature":
        return <TemperatureCard />;
      case "Humidity":
        return <HumidityCard />;
      case "Graph":
        return <GraphSection />;
      case "Silkworm Stages":
        return <Stages />;
      case "Environment Status":
        return <EnvStatus />;
      case "System Alerts":
        return <Alerts />;
      case "Device Control":
        return <Devices />;
      default:
        return <Typography color="white">Coming Soon...</Typography>;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#1a1a1a",
        backgroundImage: `url(${background3D})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 260,
          bgcolor: "rgba(71, 71, 76, 0.7)",
          color: "white",
          p: 2,
          overflowY: "auto",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Dashboard
        </Typography>
        <List>
          {menuItems.map((m) => (
            <ListItemButton
              key={m}
              selected={active === m}
              onClick={() => setActive(m)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                color: "white",
                "&.Mui-selected": { bgcolor: "rgba(222, 209, 209, 0.2)" },
              }}
            >
              <ListItemText primary={m} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          overflowY: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
}

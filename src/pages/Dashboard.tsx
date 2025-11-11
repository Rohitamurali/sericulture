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
  Grid,
} from "@mui/material";
import axios from "axios";
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

interface FeedData {
  created_at: string;
  field1?: string;
  field2?: string;
}

interface HistoryData {
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

const background3D =
  "https://images.freecreatives.com/wp-content/uploads/2016/04/Solid-Black-Website-Background.jpg";

export default function Dashboard() {
  const [active, setActive] = useState<string>("Temperature");
  const [temperature, setTemperature] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);
  const [history, setHistory] = useState<HistoryData[]>([]);

  // Fetch from ThingSpeak
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempRes = await axios.get(
          "https://api.thingspeak.com/channels/3138352/fields/1.json?api_key=A0WAXTLXSNO13RDT&results=10"
        );
        const humRes = await axios.get(
          "https://api.thingspeak.com/channels/3138352/fields/2.json?api_key=A0WAXTLXSNO13RDT&results=10"
        );

        const tempFeeds: FeedData[] = tempRes.data.feeds || [];
        const humFeeds: FeedData[] = humRes.data.feeds || [];

        if (tempFeeds.length) {
          setTemperature(parseFloat(tempFeeds[tempFeeds.length - 1].field1 || "0"));
        }
        if (humFeeds.length) {
          setHumidity(parseFloat(humFeeds[humFeeds.length - 1].field2 || "0"));
        }

        const combined: HistoryData[] = tempFeeds.map((t: FeedData, i: number) => ({
          timestamp: new Date(t.created_at).toLocaleTimeString(),
          temperature: parseFloat(t.field1 || "0"),
          humidity: humFeeds[i] ? parseFloat(humFeeds[i].field2 || "0") : 0,
        }));

        setHistory(combined);
      } catch (err) {
        console.error("Error fetching ThingSpeak data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  // Components
  const TemperatureCard = () => (
    <Card sx={{ width: 500, p: 2, bgcolor: "rgba(0,0,0,0.8)", color: "white" }}>
      <CardContent>
        <Typography variant="h4">Temperature</Typography>
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
          label={temperature >= 24 && temperature <= 28 ? "Optimal" : "Check"}
          color={temperature >= 24 && temperature <= 28 ? "success" : "warning"}
          sx={{ mt: 2 }}
        />
      </CardContent>
    </Card>
  );

  const HumidityCard = () => (
    <Card sx={{ width: 500, p: 2, bgcolor: "rgba(0,0,0,0.8)", color: "white" }}>
      <CardContent>
        <Typography variant="h4">Humidity</Typography>
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
          label={humidity >= 70 && humidity <= 90 ? "Optimal" : "Check"}
          color={humidity >= 70 && humidity <= 90 ? "success" : "warning"}
          sx={{ mt: 2 }}
        />
      </CardContent>
    </Card>
  );

  const GraphSection = () => (
    <Card sx={{ width: "90%", height: 450, bgcolor: "rgba(16, 14, 14, 0.9)" }}>
      <CardContent>
        <Typography variant="h5" mb={2}>
          Temperature & Humidity Trend
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#ff7300" strokeWidth={2} />
            <Line type="monotone" dataKey="humidity" stroke="#3874ff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const SilkwormStages = () => {
    const stages = [
      "Egg Stage",
      "Larva Stage",
      "Cocoon Stage",
      "Pupa Stage",
      "Adult Moth Stage",
    ];
    return (
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4" color="white">
          Silkworm Growth Stages
        </Typography>
        {stages.map((stage: string, i: number) => (
          <Chip
            key={i}
            label={stage}
            color="primary"
            sx={{ fontSize: "1.2rem", width: "250px" }}
          />
        ))}
      </Stack>
    );
  };

  const EnvStatus = () => {
    const tempOk = temperature >= 24 && temperature <= 28;
    const humOk = humidity >= 70 && humidity <= 90;

    const statusBox = (label: string, ok: boolean) => (
      <Box
        sx={{
          p: 3,
          minWidth: 200,
          borderRadius: 2,
          bgcolor: ok ? "rgba(34,197,94,0.2)" : "rgba(220,38,38,0.2)",
          border: `2px solid ${ok ? "#22c55e" : "#dc2626"}`,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">{label}</Typography>
        <Typography variant="h5" color={ok ? "success.main" : "error.main"}>
          {ok ? "OK" : "Alert"}
        </Typography>
      </Box>
    );

    return (
      <Stack direction="row" spacing={4}>
        {statusBox("Temperature", tempOk)}
        {statusBox("Humidity", humOk)}
      </Stack>
    );
  };

  const Alerts = () => {
    const alerts = [
      { txt: "Temperature exceeds range", type: "warning" },
      { txt: "Sensor disconnected", type: "error" },
      { txt: "Humidity stable", type: "success" },
    ];

    return (
      <Card sx={{ maxWidth: 500, bgcolor: "rgba(49,40,185,0.8)", color: "white" }}>
        <CardContent>
          <Typography variant="h5">System Alerts</Typography>
          {alerts.map((a: { txt: string; type: string }, i: number) => (
            <Stack key={i} direction="row" alignItems="center" spacing={1} mt={1}>
              {a.type === "warning" && <WarningAmberIcon color="warning" />}
              {a.type === "error" && <ErrorIcon color="error" />}
              {a.type === "success" && <CheckCircleIcon color="success" />}
              <Typography>{a.txt}</Typography>
            </Stack>
          ))}
        </CardContent>
      </Card>
    );
  };

  const Devices = () => {
    const devices = ["Fan", "Heater", "Humidifier", "Cooler"];
    return (
      <Grid container spacing={2} justifyContent="center">
        {devices.map((d: string) => (
          <Grid item xs={12} sm={6} md={4} key={d}>
            <Card
              sx={{
                bgcolor: "rgba(0,0,0,0.7)",
                color: "white",
                p: 2,
                textAlign: "center",
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" mb={1}>
                {d}
              </Typography>
              <Stack direction="row" justifyContent="center" spacing={2}>
                <Button variant="contained" color="success">
                  ON
                </Button>
                <Button variant="outlined" color="error">
                  OFF
                </Button>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
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
        return <SilkwormStages />;
      case "Environment Status":
        return <EnvStatus />;
      case "System Alerts":
        return <Alerts />;
      case "Device Control":
        return <Devices />;
      default:
        return <Typography color="white">Coming soon...</Typography>;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${background3D})`,
        backgroundSize: "cover",
        color: "white",
      }}
    >
      {/* Sidebar */}
      <Box sx={{ width: 260, bgcolor: "rgba(0,0,0,0.7)", p: 2 }}>
        <Typography variant="h5" mb={2}>
          Dashboard
        </Typography>
        <List>
          {menuItems.map((m: string) => (
            <ListItemButton
              key={m}
              selected={active === m}
              onClick={() => setActive(m)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                color: "white",
                "&.Mui-selected": { bgcolor: "rgba(255,255,255,0.2)" },
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
}

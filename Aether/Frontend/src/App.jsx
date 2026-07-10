import { Routes, Route } from "react-router-dom";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Activity from "./pages/Activity";
import Profile from "./pages/Profile";
import WeatherCard from "./components/WeatherCard/WeatherCard";

function App() {
  const [tabs, setTabs] = useState([
    { 
      id: 1, 
      title: "Home", 
      url: "/", 
      icon: "🏠", 
      content: <Home />,
      searchQuery: ""
    }
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [showMessage, setShowMessage] = useState(null);
  const [messageVisible, setMessageVisible] = useState(false);
  const [pendingTab, setPendingTab] = useState(null);
  const [isMessageShowing, setIsMessageShowing] = useState(false);

  const openNewTab = useCallback((url = "/", title = "New Tab") => {
    let content;
    switch(url) {
      case "/":
        content = <Home />;
        break;
      case "/explore":
        content = <Explore />;
        break;
      case "/activity":
        content = <Activity />;
        break;
      case "/profile":
        content = <Profile />;
        break;
      default:
        content = <Home />;
    }

    const newTab = {
      id: Date.now(),
      title: title,
      url: url,
      icon: "🌐",
      content: content,
      searchQuery: ""
    };

    const newTabCount = tabs.length + 1;

    if (newTabCount === 7) {
      setShowMessage({
        type: "thala",
        mainText: "Number 7",
        subText: "Thala for a reason!",
        emoji: "7️⃣",
        achievement: "🏏 Legendary achievement!",
        color: "#a78bfa",
        bgColor: "rgba(167, 139, 250, 0.1)",
        fontSize: "clamp(56px, 12vw, 120px)" // Normal size for "Number 7"
      });
      setPendingTab(newTab);
      setMessageVisible(true);
      setIsMessageShowing(true);
      
      setTimeout(() => {
        setMessageVisible(false);
        setIsMessageShowing(false);
        setTabs(prev => [...prev, newTab]);
        setActiveTabId(newTab.id);
        setPendingTab(null);
        setShowMessage(null);
      }, 5000);
      
      return;
    }
    
    if (newTabCount === 10) {
      setShowMessage({
        type: "messi",
        mainText: "MESSSSSI!",
        subText: "The GOAT has arrived!",
        emoji: "🐐",
        achievement: "⚽ Greatest of All Time!",
        color: "#f0abfc",
        bgColor: "rgba(240, 171, 252, 0.1)",
        fontSize: "clamp(48px, 10vw, 100px)" // Slightly smaller for longer text
      });
      setPendingTab(newTab);
      setMessageVisible(true);
      setIsMessageShowing(true);
      
      setTimeout(() => {
        setMessageVisible(false);
        setIsMessageShowing(false);
        setTabs(prev => [...prev, newTab]);
        setActiveTabId(newTab.id);
        setPendingTab(null);
        setShowMessage(null);
      }, 5000);
      
      return;
    }

    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
  }, [tabs.length]);

  const closeTab = useCallback((tabId) => {
    if (tabs.length <= 1) return;
    
    setTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => tab.id !== tabId);
      if (activeTabId === tabId) {
        setActiveTabId(newTabs[newTabs.length - 1].id);
      }
      return newTabs;
    });
  }, [tabs.length, activeTabId]);

  const switchTab = useCallback((tabId) => {
    setActiveTabId(tabId);
  }, []);

  const updateTabSearch = useCallback((tabId, query) => {
    setTabs(prevTabs => 
      prevTabs.map(tab => 
        tab.id === tabId ? { ...tab, searchQuery: query } : tab
      )
    );
  }, []);

  const getActiveContent = useCallback(() => {
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    return activeTab ? activeTab.content : <Home />;
  }, [tabs, activeTabId]);

  const getActiveSearch = useCallback(() => {
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    return activeTab ? activeTab.searchQuery : "";
  }, [tabs, activeTabId]);

  // FULL SCREEN message
  const FullScreenMessage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        background: `radial-gradient(circle at center, rgba(10, 10, 18, 0.98), rgba(5, 5, 15, 0.99))`,
        backdropFilter: "blur(60px) saturate(200%)",
        WebkitBackdropFilter: "blur(60px) saturate(200%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >
      {/* Animated background orbs */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden"
      }}>
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 100 * (i % 2 === 0 ? 1 : -1), 0],
              y: [0, 100 * (i % 2 === 0 ? -1 : 1), 0]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: "absolute",
              width: `${500 + i * 200}px`,
              height: `${500 + i * 200}px`,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${showMessage.color}33, transparent 70%)`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              filter: "blur(80px)"
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden"
      }}>
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{ 
              y: [null, -200 - Math.random() * 300, -400 - Math.random() * 300],
              scale: [0, 1.5 + Math.random() * 0.5, 0],
              opacity: [0, 1, 0],
              x: [null, Math.random() * 200 - 100, Math.random() * 200 - 100]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              delay: Math.random() * 4,
              repeat: Infinity,
              ease: "easeOut"
            }}
            style={{
              position: "absolute",
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              background: showMessage.color,
              borderRadius: "50%",
              boxShadow: `0 0 30px ${showMessage.color}`,
              opacity: 0
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 80 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: -80 }}
        transition={{ 
          type: "spring",
          stiffness: 120,
          damping: 18,
          duration: 1.2
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          zIndex: 2,
          maxWidth: "92vw",
          padding: "50px 60px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "60px",
          border: `2px solid ${showMessage.color}44`,
          boxShadow: `0 0 120px ${showMessage.color}33, inset 0 0 120px ${showMessage.color}11`,
          position: "relative"
        }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            fontSize: "clamp(120px, 25vw, 200px)",
            lineHeight: 1,
            filter: `drop-shadow(0 0 60px ${showMessage.color}44)`
          }}
        >
          {showMessage.emoji}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            width: "100%"
          }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            style={{
              color: "#fff",
              fontSize: showMessage.fontSize || "clamp(56px, 12vw, 120px)",
              fontWeight: "900",
              margin: 0,
              textAlign: "center",
              background: `linear-gradient(135deg, ${showMessage.color}, #fff, ${showMessage.color})`,
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradientShift 3s ease infinite",
              letterSpacing: "-0.03em",
              textShadow: `0 0 80px ${showMessage.color}33`,
              lineHeight: 1.2,
              wordBreak: "break-word",
              maxWidth: "100%"
            }}
          >
            {showMessage.mainText}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            style={{
              color: "rgba(255,255,255,0.95)",
              fontSize: "clamp(28px, 5vw, 56px)",
              fontWeight: "700",
              margin: 0,
              textAlign: "center",
              letterSpacing: "0.02em"
            }}
          >
            {showMessage.subText}
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "clamp(300px, 60vw, 700px)", opacity: 1 }}
          transition={{ delay: 0.45, duration: 1.2 }}
          style={{
            height: "3px",
            background: `linear-gradient(90deg, transparent, ${showMessage.color}, transparent)`,
            borderRadius: "2px",
            boxShadow: `0 0 40px ${showMessage.color}55`
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              filter: `drop-shadow(0 0 30px ${showMessage.color}44)`
            }}
          >
            {showMessage.type === "thala" ? "🏏" : "⚽"}
          </motion.span>
          
          <span style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "clamp(20px, 2.5vw, 32px)",
            fontWeight: "500",
            letterSpacing: "0.05em",
            textAlign: "center"
          }}>
            {showMessage.achievement}
          </span>

          <motion.span
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0]
            }}
            transition={{
              duration: 1.5,
              delay: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              filter: `drop-shadow(0 0 30px ${showMessage.color}44)`
            }}
          >
            {showMessage.type === "thala" ? "🏏" : "⚽"}
          </motion.span>
        </motion.div>

        {/* Sparkle stars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          style={{
            display: "flex",
            gap: "14px",
            marginTop: "8px",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.8,
                delay: i * 0.08,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: showMessage.color,
                boxShadow: `0 0 20px ${showMessage.color}88`
              }}
            />
          ))}
        </motion.div>

        {/* Timer - 5 seconds */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{
            position: "absolute",
            bottom: "40px",
            right: "50px",
            color: "rgba(255,255,255,0.15)",
            fontSize: "14px",
            fontWeight: "400",
            letterSpacing: "0.1em",
            fontFamily: "monospace"
          }}
        >
          ⏱ 5s
        </motion.div>
      </motion.div>

      {/* Progress bar at bottom */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 5, ease: "linear" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "4px",
          background: `linear-gradient(90deg, ${showMessage.color}, #fff, ${showMessage.color})`,
          boxShadow: `0 0 40px ${showMessage.color}66`,
          zIndex: 3
        }}
      />
    </motion.div>
  );

  return (
    <div style={{ 
      width: "100vw", 
      height: "100vh", 
      position: "relative", 
      overflow: "hidden",
      background: "#0A0A12"
    }}>
      {/* Full Screen Message */}
      <AnimatePresence mode="wait">
        {messageVisible && showMessage && <FullScreenMessage />}
      </AnimatePresence>

      {/* Tab Bar - hidden during message */}
      {!isMessageShowing && (
        <div style={{
          position: "fixed",
          top: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          width: "90%",
          maxWidth: "1200px",
        }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              gap: "4px",
              padding: "8px 14px",
              background: "rgba(18, 16, 28, 0.85)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              overflowX: "auto",
              overflowY: "hidden",
              scrollbarWidth: "thin",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              alignItems: "center",
              height: "44px",
              willChange: "transform"
            }} 
            className="tab-bar"
          >
            {tabs.map((tab) => (
              <motion.div
                key={tab.id}
                layout
                initial={{ opacity: 0, scale: 0.9, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 10 }}
                transition={{ 
                  duration: 0.2,
                  type: "spring",
                  stiffness: 400,
                  damping: 30
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px 4px 12px",
                  background: activeTabId === tab.id ? "rgba(167, 139, 250, 0.15)" : "transparent",
                  borderRadius: "10px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  border: activeTabId === tab.id ? "1px solid rgba(167, 139, 250, 0.2)" : "1px solid transparent",
                  minWidth: "50px",
                  maxWidth: "140px",
                  height: "30px",
                  flexShrink: 0,
                  transition: "background 0.15s ease, border 0.15s ease"
                }}
                onClick={() => switchTab(tab.id)}
                whileHover={{ 
                  scale: 1.03,
                  background: "rgba(255,255,255,0.05)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span style={{ fontSize: "13px", flexShrink: 0 }}>{tab.icon}</span>
                <span style={{
                  color: activeTabId === tab.id ? "#fff" : "rgba(255,255,255,0.5)",
                  fontSize: "12px",
                  fontWeight: activeTabId === tab.id ? "500" : "400",
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontFamily: "system-ui, sans-serif"
                }}>
                  {tab.title}
                </span>
                {tabs.length > 1 && (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                    whileHover={{ scale: 1.2, background: "rgba(255,50,50,0.2)" }}
                    whileTap={{ scale: 0.8 }}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "rgba(255,255,255,0.3)",
                      borderRadius: "50%",
                      width: "16px",
                      height: "16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "9px",
                      padding: 0,
                      transition: "all 0.15s ease",
                      flexShrink: 0
                    }}
                  >
                    ✕
                  </motion.button>
                )}
              </motion.div>
            ))}
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              style={{
                background: "rgba(167, 139, 250, 0.12)",
                border: "1px solid rgba(167, 139, 250, 0.15)",
                color: "#a78bfa",
                borderRadius: "10px",
                width: "28px",
                height: "28px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: "300",
                transition: "all 0.15s ease",
                flexShrink: 0
              }}
              onClick={() => openNewTab("/", "New Tab")}
            >
              +
            </motion.button>
          </motion.div>
        </div>
      )}

      {/* Navbar Container */}
      <div style={{ 
        position: "fixed", 
        top: "66px", 
        left: 0, 
        right: 0, 
        zIndex: 999,
        pointerEvents: "none"
      }}>
        <div style={{ pointerEvents: "auto" }}>
          <Navbar 
            tabSearchQuery={getActiveSearch()}
            onSearchChange={(query) => updateTabSearch(activeTabId, query)}
          />
        </div>
      </div>

      {/* Weather Card */}
      <div style={{ position: "fixed", top: "76px", right: "24px", zIndex: 50 }}>
        <WeatherCard />
      </div>

      {/* Content area */}
      <div style={{ 
        width: "100%", 
        height: "100%", 
        paddingTop: "125px",
        position: "relative",
        zIndex: 1,
        overflow: "auto"
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut"
            }}
            style={{ 
              width: "100%", 
              height: "100%",
              willChange: "opacity"
            }}
          >
            {getActiveContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
#!/bin/bash

# Discord R2-D2 & C-3PO Bots Startup Script

echo "🌟 Starting Star Wars Discord Bots..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please copy .env.example to .env and add your bot tokens."
    echo "Run: cp .env.example .env"
    exit 1
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if PM2 is available
if command -v pm2 &> /dev/null; then
    echo "Using PM2 to manage bots..."
    echo ""

    # Stop existing instances if running
    pm2 delete r2d2 2>/dev/null
    pm2 delete c3po 2>/dev/null
    pm2 delete kenobi 2>/dev/null

    # Start all three bots
    pm2 start r2d2-bot.js --name r2d2
    pm2 start c3po-bot.js --name c3po
    pm2 start kenobi-bot.js --name kenobi

    echo ""
    echo "✅ All three bots started with PM2!"
    echo ""
    echo "Useful commands:"
    echo "  pm2 status      - Check bot status"
    echo "  pm2 logs        - View bot logs"
    echo "  pm2 restart all - Restart all bots"
    echo "  pm2 stop all    - Stop all bots"
    echo ""
else
    echo "PM2 not found. Starting bots in separate processes..."
    echo "Note: Install PM2 for better management: npm install -g pm2"
    echo ""

    # Start R2-D2 in background
    echo "🤖 Starting R2-D2..."
    node r2d2-bot.js > r2d2.log 2>&1 &
    R2D2_PID=$!

    # Start C-3PO in background
    echo "🌟 Starting C-3PO..."
    node c3po-bot.js > c3po.log 2>&1 &
    C3PO_PID=$!

    # Start General Kenobi in background
    echo "⚔️ Starting General Kenobi..."
    node kenobi-bot.js > kenobi.log 2>&1 &
    KENOBI_PID=$!

    echo ""
    echo "✅ All three bots started!"
    echo "R2-D2 PID: $R2D2_PID (log: r2d2.log)"
    echo "C-3PO PID: $C3PO_PID (log: c3po.log)"
    echo "General Kenobi PID: $KENOBI_PID (log: kenobi.log)"
    echo ""
    echo "To stop the bots:"
    echo "  kill $R2D2_PID $C3PO_PID $KENOBI_PID"
    echo ""
    echo "To view logs:"
    echo "  tail -f r2d2.log"
    echo "  tail -f c3po.log"
    echo "  tail -f kenobi.log"
    echo ""
fi

echo "May the Force be with you! 🌟"

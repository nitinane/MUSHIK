// Modak Run - Main Game Architecture & Scene Implementations
// Single static architecture: Preload, Menu, LevelScene (data-driven), LevelComplete, GameOver

// --- 1. PRELOAD SCENE ---
class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Background card for loader
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x2a0845, 0x2a0845, 0x6441a5, 0x6441a5, 1);
        bg.fillRect(0, 0, width, height);

        // Festive loading title
        this.add.text(width / 2, height / 2 - 90, '🕉️ MODAK RUN 🕉️', {
            fontFamily: 'Segoe UI, Trebuchet MS, sans-serif',
            fontSize: '46px',
            fontStyle: 'bold',
            color: '#FFD700',
            stroke: '#8B0000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 - 35, 'Mushak\'s Journey to the Ganesh Pandal', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '20px',
            color: '#FFA500'
        }).setOrigin(0.5);

        // Progress bar container
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x1a1a2e, 0.8);
        progressBox.fillRoundedRect(width / 2 - 200, height / 2 + 30, 400, 32, 16);
        progressBox.lineStyle(3, 0xffa500, 1);
        progressBox.strokeRoundedRect(width / 2 - 200, height / 2 + 30, 400, 32, 16);

        const progressBar = this.add.graphics();
        const percentText = this.add.text(width / 2, height / 2 + 46, '0%', {
            fontFamily: 'sans-serif',
            fontSize: '16px',
            fontStyle: 'bold',
            color: '#ffffff'
        }).setOrigin(0.5);

        const statusText = this.add.text(width / 2, height / 2 + 85, 'Loading festival assets...', {
            fontFamily: 'sans-serif',
            fontSize: '14px',
            color: '#e0d0b0'
        }).setOrigin(0.5);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillGradientStyle(0xffa500, 0xffd700, 0xff4500, 0xff8c00, 1);
            progressBar.fillRoundedRect(width / 2 - 196, height / 2 + 34, 392 * value, 24, 12);
            percentText.setText(Math.floor(value * 100) + '%');
        });

        this.load.on('fileprogress', (file) => {
            statusText.setText('Loading: ' + file.key);
        });

        // Load all 13 exact game assets from assets/ with cache-buster v=6
        const v = '?v=6';
        this.load.image('background', 'assets/background.png' + v);
        this.load.image('standing_mushak', 'assets/standing_mushak.png' + v);
        this.load.image('mushak_running_1', 'assets/mushak_running_1.png' + v);
        this.load.image('mushak_running_2', 'assets/mushak_running_2.png' + v);
        this.load.image('jumping_mushak', 'assets/jumping_mushak.png' + v);
        this.load.image('platform', 'assets/platform.png' + v);
        this.load.image('brick1', 'assets/brick1.png' + v);
        this.load.image('brick_with_questionmark', 'assets/brick_with_questionmark.png' + v);
        this.load.image('cat_obstical', 'assets/cat_obstical.png' + v);
        this.load.image('modak', 'assets/modak.png' + v);
        this.load.image('cheese', 'assets/cheese.png' + v);
        this.load.image('warp_pipe', 'assets/warp_pipe.png' + v);
        this.load.image('ganesh_pandal_image', 'assets/ganesh_pandal_image.png' + v);
        this.load.image('game_logo', 'assets/logo.png' + v);
        this.load.image('ganesha_coin', 'assets/ganesha_coin.png' + v);
        this.load.image('plane', 'assets/plane.png' + v);
        this.load.image('blast', 'assets/blast.png' + v);
    }

    create() {
        this.scene.start('MenuScene');
    }
}


// --- 2. MENU SCENE (MAIN PAGE) ---
class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const width = 1280;
        const height = 720;

        // Festive background
        const bg = this.add.image(width / 2, height / 2, 'background');
        bg.setDisplaySize(width, height);
        bg.setTint(0x9988aa);

        // Subtle dark gradient overlay
        const overlay = this.add.graphics();
        overlay.fillGradientStyle(0x000000, 0x000000, 0x220500, 0x440a00, 0.7);
        overlay.fillRect(0, 0, width, height);

        // Header decorative elements
        this.add.text(width / 2, 38, '🚩 श्री गणेशाय नमः • GANESH CHATURTHI FESTIVAL 🚩', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '20px',
            fontStyle: 'bold',
            color: '#FFB800'
        }).setOrigin(0.5);

        // Official Pixel Art Game Logo ("MUSHIK" with Mushak in padmasana)
        const logo = this.add.image(width / 2, 175, 'game_logo');
        logo.setDisplaySize(235, 235);

        // Floating gentle breathing tween for the logo
        this.tweens.add({
            targets: logo,
            y: 165,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Flanking divine items on sides of logo: Ganesha Coin (left) and Modak (right)
        const leftCoin = this.add.image(width / 2 - 210, 170, 'ganesha_coin').setDisplaySize(42, 63);
        const rightModak = this.add.image(width / 2 + 210, 170, 'modak').setDisplaySize(52, 52);

        this.tweens.add({
            targets: [leftCoin, rightModak],
            y: '+=12',
            rotation: 0.12,
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Subtitle banner
        this.add.text(width / 2, 305, 'Help Mushak Reach Lord Ganesha\'s Holy Pandal!', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '23px',
            color: '#FFFFFF',
            stroke: '#331100',
            strokeThickness: 4
        }).setOrigin(0.5);

        // MAIN ACTION BUTTON 1: START GAME (Level 1)
        this.createButton(width / 2, 385, 300, 58, '▶ START GAME', 0xFF5722, 0xFF7043, 0xFFD700, () => {
            if (window.SoundEffects) window.SoundEffects.playJump();
            this.cameras.main.fade(300, 0, 0, 0);
            this.time.delayedCall(300, () => {
                this.scene.start('LevelScene', { levelId: 'level1' });
            });
        });

        // MAIN ACTION BUTTON 2: SELECT LEVEL (Levels Page)
        this.createButton(width / 2, 462, 300, 58, '🗺️ SELECT LEVEL', 0x6A1B9A, 0x8E24AA, 0xFFD54F, () => {
            if (window.SoundEffects) window.SoundEffects.playJump();
            this.cameras.main.fade(250, 0, 0, 0);
            this.time.delayedCall(250, () => {
                this.scene.start('LevelSelectScene');
            });
        });

        // ACTION BUTTON 3: HOW TO PLAY MODAL
        const helpBtn = this.add.text(width / 2, 538, '📖 How to Play & Game Rules', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '18px',
            fontStyle: 'bold',
            color: '#FFCA28'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        helpBtn.on('pointerover', () => helpBtn.setColor('#FFFFFF'));
        helpBtn.on('pointerout', () => helpBtn.setColor('#FFCA28'));
        helpBtn.on('pointerdown', () => this.showHelpModal());

        // Quick footer info
        this.add.text(width / 2, 675, '6 Festival Neighborhoods  •  Collect Modaks & Ganesha Coins  •  Stomp Sneaky Cats  •  Reach the Holy Pandal', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '15px',
            color: '#CFD8DC'
        }).setOrigin(0.5);
    }

    createButton(x, y, w, h, text, color1, color2, strokeColor, onClick) {
        const btn = this.add.container(x, y);
        const bg = this.add.graphics();
        bg.fillStyle(color1, 1);
        bg.fillRoundedRect(-w / 2, -h / 2, w, h, h / 2);
        bg.lineStyle(4, strokeColor, 1);
        bg.strokeRoundedRect(-w / 2, -h / 2, w, h, h / 2);

        const txt = this.add.text(0, 0, text, {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '24px',
            fontStyle: 'bold',
            color: '#FFFFFF',
            stroke: '#3e1100',
            strokeThickness: 3
        }).setOrigin(0.5);

        btn.add([bg, txt]);
        btn.setSize(w, h);
        btn.setInteractive({ useHandCursor: true });

        btn.on('pointerover', () => {
            btn.setScale(1.06);
            bg.clear();
            bg.fillStyle(color2, 1);
            bg.fillRoundedRect(-w / 2, -h / 2, w, h, h / 2);
            bg.lineStyle(4, 0xFFEB3B, 1);
            bg.strokeRoundedRect(-w / 2, -h / 2, w, h, h / 2);
        });

        btn.on('pointerout', () => {
            btn.setScale(1.0);
            bg.clear();
            bg.fillStyle(color1, 1);
            bg.fillRoundedRect(-w / 2, -h / 2, w, h, h / 2);
            bg.lineStyle(4, strokeColor, 1);
            bg.strokeRoundedRect(-w / 2, -h / 2, w, h, h / 2);
        });

        btn.on('pointerdown', onClick);
        return btn;
    }

    showHelpModal() {
        if (this.helpContainer) {
            this.helpContainer.destroy();
        }
        const width = 1280;
        const height = 720;

        const container = this.add.container(0, 0).setDepth(200);
        this.helpContainer = container;

        // Dark dim backdrop
        const dimmer = this.add.graphics();
        dimmer.fillStyle(0x000000, 0.85);
        dimmer.fillRect(0, 0, width, height);
        dimmer.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
        container.add(dimmer);

        // Modal card box
        const modalBox = this.add.graphics();
        modalBox.fillStyle(0x1a0f26, 0.96);
        modalBox.fillRoundedRect(width / 2 - 380, height / 2 - 220, 760, 440, 20);
        modalBox.lineStyle(3, 0xFFA000, 1);
        modalBox.strokeRoundedRect(width / 2 - 380, height / 2 - 220, 760, 440, 20);
        container.add(modalBox);

        const title = this.add.text(width / 2, height / 2 - 175, '🎮 HOW TO PLAY & GAMEPLAY RULES', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '24px',
            fontStyle: 'bold',
            color: '#FFD54F'
        }).setOrigin(0.5);
        container.add(title);

        const tips = [
            '• Move: Left / Right Arrow Keys or A / D keys',
            '• Jump: Spacebar or Up Arrow / W key (Hold for longer leap)',
            '• [ ? ] Mystery Blocks: Hit from below for random CHEESE (1 per level) or GANESHA COINS!',
            '• 🪙 Ganesha Coin: Sacred divine coin found in mystery blocks (+25 pts)!',
            '• Big Mushak: Eating Cheese makes Mushak huge and grants 1-hit protection!',
            '• Bricks: Big Mushak can smash solid brick blocks from below (+5 pts)',
            '• Cats: Stomp on sneaky cats from above to defeat them (+20 pts) & bounce!',
            '• Pandal: Reach Lord Ganesha\'s Holy Pandal to complete each level!'
        ];

        tips.forEach((tip, idx) => {
            const t = this.add.text(width / 2 - 340, height / 2 - 130 + (idx * 33), tip, {
                fontFamily: 'Segoe UI, sans-serif',
                fontSize: '16px',
                color: idx === 2 || idx === 3 ? '#FFE082' : '#E0E0E0'
            });
            container.add(t);
        });

        // Close Button
        const closeBtn = this.add.container(width / 2, height / 2 + 175);
        const cBg = this.add.graphics();
        cBg.fillStyle(0xFF5722, 1);
        cBg.fillRoundedRect(-80, -22, 160, 44, 22);
        cBg.lineStyle(2, 0xFFD54F, 1);
        cBg.strokeRoundedRect(-80, -22, 160, 44, 22);

        const cTxt = this.add.text(0, 0, 'GOT IT! ✕', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '18px',
            fontStyle: 'bold',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        closeBtn.add([cBg, cTxt]);
        closeBtn.setSize(160, 44);
        closeBtn.setInteractive({ useHandCursor: true });
        closeBtn.on('pointerdown', () => container.destroy());
        container.add(closeBtn);
    }
}


// --- 2.5. LEVEL SELECT SCENE (LEVELS PAGE) ---
class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super('LevelSelectScene');
    }

    create() {
        const width = 1280;
        const height = 720;

        // Festive background with rich deep purple overlay
        const bg = this.add.image(width / 2, height / 2, 'background');
        bg.setDisplaySize(width, height);
        bg.setTint(0x7e57c2);

        const overlay = this.add.graphics();
        overlay.fillGradientStyle(0x100520, 0x100520, 0x050010, 0x050010, 0.84);
        overlay.fillRect(0, 0, width, height);

        // Header Navigation Bar
        const backBtn = this.add.container(120, 45);
        const backBg = this.add.graphics();
        backBg.fillStyle(0x311b92, 0.9);
        backBg.fillRoundedRect(-80, -20, 160, 40, 20);
        backBg.lineStyle(2, 0xFFB300, 1);
        backBg.strokeRoundedRect(-80, -20, 160, 40, 20);

        const backTxt = this.add.text(0, 0, '← Main Menu', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '17px',
            fontStyle: 'bold',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        backBtn.add([backBg, backTxt]);
        backBtn.setSize(160, 40);
        backBtn.setInteractive({ useHandCursor: true });

        backBtn.on('pointerover', () => {
            backBtn.setScale(1.05);
            backBg.clear();
            backBg.fillStyle(0x4527a0, 1);
            backBg.fillRoundedRect(-80, -20, 160, 40, 20);
            backBg.lineStyle(2, 0xFFD54F, 1);
            backBg.strokeRoundedRect(-80, -20, 160, 40, 20);
        });
        backBtn.on('pointerout', () => {
            backBtn.setScale(1.0);
            backBg.clear();
            backBg.fillStyle(0x311b92, 0.9);
            backBg.fillRoundedRect(-80, -20, 160, 40, 20);
            backBg.lineStyle(2, 0xFFB300, 1);
            backBg.strokeRoundedRect(-80, -20, 160, 40, 20);
        });
        backBtn.on('pointerdown', () => {
            if (window.SoundEffects) window.SoundEffects.playJump();
            this.scene.start('MenuScene');
        });

        // Page Header
        this.add.text(width / 2, 45, '🚩 SELECT FESTIVAL LEVEL 🚩', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '36px',
            fontStyle: '900',
            color: '#FFF275',
            stroke: '#B71C1C',
            strokeThickness: 6,
            shadow: { offsetX: 2, offsetY: 3, color: '#000000', blur: 6, fill: true }
        }).setOrigin(0.5);

        this.add.text(width / 2, 85, 'Choose a neighborhood to guide Mushak directly to Lord Ganesha\'s Holy Pandal', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '16px',
            color: '#FFD54F'
        }).setOrigin(0.5);

        // Level Cards Data (Levels 1 to 6)
        const levels = [
            {
                id: 'level1',
                num: 'LEVEL 1',
                title: 'Galli / Lane',
                subtitle: 'The Festival Alleyway',
                diff: 'EASY',
                stars: '⭐',
                themeColor: 0xE65100,
                accentColor: 0xFF9800,
                x: 235,
                y: 175,
                w: 330,
                h: 155
            },
            {
                id: 'level2',
                num: 'LEVEL 2',
                title: 'Market Street',
                subtitle: 'The Bustling Bazaar',
                diff: 'MEDIUM',
                stars: '⭐⭐',
                themeColor: 0xF57F17,
                accentColor: 0xFFD600,
                x: 640,
                y: 175,
                w: 330,
                h: 155
            },
            {
                id: 'level3',
                num: 'LEVEL 3',
                title: 'Rooftop Hop',
                subtitle: 'Above the Festive City',
                diff: 'HARD',
                stars: '⭐⭐⭐',
                themeColor: 0xC2185B,
                accentColor: 0xFF4081,
                x: 1045,
                y: 175,
                w: 330,
                h: 155
            },
            {
                id: 'level4',
                num: 'LEVEL 4',
                title: 'Procession Road',
                subtitle: 'The Grand Shobha Yatra',
                diff: 'EXPERT',
                stars: '⭐⭐⭐⭐',
                themeColor: 0x4A148C,
                accentColor: 0xAB47BC,
                x: 235,
                y: 345,
                w: 330,
                h: 155
            },
            {
                id: 'level5',
                num: 'LEVEL 5',
                title: 'The Pandal (Finale)',
                subtitle: 'Lord Ganesha\'s Sanctuary',
                diff: 'MASTER',
                stars: '⭐⭐⭐⭐⭐',
                themeColor: 0x004D40,
                accentColor: 0x00BFA5,
                x: 640,
                y: 345,
                w: 330,
                h: 155
            },
            {
                id: 'level6',
                num: '🔥 BONUS',
                title: 'Rage Round 💀',
                subtitle: 'Reversed Galli Chaos',
                diff: 'NIGHTMARE',
                stars: '💀💀💀',
                isBonus: true,
                themeColor: 0xB71C1C,
                accentColor: 0xFF1744,
                x: 1045,
                y: 345,
                w: 330,
                h: 155
            }
        ];

        levels.forEach(lvl => {
            this.createLevelCard(lvl);
        });

        // Dedicated Sky Dash Bonus Mode Banner Card
        this.createSkyDashCard(width / 2, 525, 1140, 118);

        // Bottom tip
        this.add.text(width / 2, 680, '✨ All platformer levels unlocked • Click any level card or take flight in Sky Dash!', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '15px',
            color: '#ECEFF1'
        }).setOrigin(0.5);
    }

    createLevelCard(lvl) {
        const card = this.add.container(lvl.x, lvl.y);
        const w = lvl.w;
        const h = lvl.h;

        // Card background
        const cardBg = this.add.graphics();
        const baseBgColor = lvl.isBonus ? 0x240606 : 0x180d24;
        cardBg.fillStyle(baseBgColor, 0.94);
        cardBg.fillRoundedRect(-w / 2, -h / 2, w, h, 18);
        cardBg.lineStyle(3, lvl.accentColor, 0.95);
        cardBg.strokeRoundedRect(-w / 2, -h / 2, w, h, 18);

        // Top level badge
        const badgeW = lvl.isBonus ? 116 : 105;
        const badgeBg = this.add.graphics();
        badgeBg.fillStyle(lvl.themeColor, 1);
        badgeBg.fillRoundedRect(-w / 2 + 16, -h / 2 + 14, badgeW, 26, 13);

        const badgeText = this.add.text(-w / 2 + 16 + badgeW / 2, -h / 2 + 27, lvl.num, {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '14px',
            fontStyle: 'bold',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // Difficulty tag in top right
        const diffText = this.add.text(w / 2 - 16, -h / 2 + 27, `${lvl.stars} ${lvl.diff}`, {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '13px',
            fontStyle: 'bold',
            color: lvl.isBonus ? '#FF8A80' : '#FFD54F'
        }).setOrigin(1, 0.5);

        // Level Title
        const titleText = this.add.text(-w / 2 + 18, -h / 2 + 55, lvl.title, {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '20px',
            fontStyle: 'bold',
            color: '#FFFFFF'
        });

        // Level Subtitle
        const subText = this.add.text(-w / 2 + 18, -h / 2 + 82, lvl.subtitle, {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '13px',
            color: lvl.isBonus ? '#FFAB91' : '#B0BEC5'
        });

        // Small modak decorative icon
        const icon = this.add.image(-w / 2 + 35, h / 2 - 26, 'modak').setDisplaySize(26, 26);

        // Play button inside card
        const btnBg = this.add.graphics();
        btnBg.fillStyle(lvl.themeColor, 1);
        btnBg.fillRoundedRect(w / 2 - 140, h / 2 - 44, 124, 32, 16);
        btnBg.lineStyle(2, lvl.isBonus ? 0xFF8A80 : 0xFFD54F, 1);
        btnBg.strokeRoundedRect(w / 2 - 140, h / 2 - 44, 124, 32, 16);

        const btnText = this.add.text(w / 2 - 78, h / 2 - 28, '▶ PLAY', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '15px',
            fontStyle: 'bold',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        card.add([cardBg, badgeBg, badgeText, diffText, titleText, subText, icon, btnBg, btnText]);
        card.setSize(w, h);
        card.setInteractive({ useHandCursor: true });

        card.on('pointerover', () => {
            card.setScale(1.04);
            cardBg.clear();
            cardBg.fillStyle(lvl.isBonus ? 0x3d0a0a : 0x28163c, 0.98);
            cardBg.fillRoundedRect(-w / 2, -h / 2, w, h, 18);
            cardBg.lineStyle(4, lvl.isBonus ? 0xFF5252 : 0xFFEB3B, 1);
            cardBg.strokeRoundedRect(-w / 2, -h / 2, w, h, 18);
        });

        card.on('pointerout', () => {
            card.setScale(1.0);
            cardBg.clear();
            cardBg.fillStyle(baseBgColor, 0.94);
            cardBg.fillRoundedRect(-w / 2, -h / 2, w, h, 18);
            cardBg.lineStyle(3, lvl.accentColor, 0.95);
            cardBg.strokeRoundedRect(-w / 2, -h / 2, w, h, 18);
        });

        card.on('pointerdown', () => {
            if (window.SoundEffects) window.SoundEffects.playJump();
            this.cameras.main.fade(300, 0, 0, 0);
            this.time.delayedCall(300, () => {
                this.scene.start('LevelScene', { levelId: lvl.id });
            });
        });
    }

    createSkyDashCard(x, y, w, h) {
        const card = this.add.container(x, y);
        const bestScore = parseInt(localStorage.getItem('mushik_skydash_best') || '0', 10);

        // Card background: deep aviation navy gradient with neon cyan/gold border
        const cardBg = this.add.graphics();
        cardBg.fillStyle(0x0a142c, 0.95);
        cardBg.fillRoundedRect(-w / 2, -h / 2, w, h, 20);
        cardBg.lineStyle(3, 0x00E5FF, 1);
        cardBg.strokeRoundedRect(-w / 2, -h / 2, w, h, 20);

        // Mushak Biplane sprite preview on the left
        const plane = this.add.image(-w / 2 + 65, 0, 'plane');
        plane.setDisplaySize(76, 76);
        plane.setRotation(-0.12);

        // Floating bob animation for the biplane
        this.tweens.add({
            targets: plane,
            y: -6,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Mode badge
        const badgeBg = this.add.graphics();
        badgeBg.fillStyle(0x00838F, 1);
        badgeBg.fillRoundedRect(-w / 2 + 125, -h / 2 + 14, 185, 26, 13);

        const badgeText = this.add.text(-w / 2 + 125 + 92, -h / 2 + 27, '✈️ SPECIAL BONUS MODE', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '13px',
            fontStyle: 'bold',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // Main Title
        const titleText = this.add.text(-w / 2 + 125, -h / 2 + 48, 'SKY DASH: BIPLANE RUN', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '23px',
            fontStyle: '900',
            color: '#00E5FF',
            stroke: '#002244',
            strokeThickness: 3
        });

        // Subtitle
        const subText = this.add.text(-w / 2 + 125, -h / 2 + 78, 'Flappy Mushak Arcade Challenge • Flap through ancient temple pillars & set the high score!', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '14px',
            color: '#B2EBF2'
        });

        // Best Score Badge
        const bestBg = this.add.graphics();
        bestBg.fillStyle(0x1a237e, 0.9);
        bestBg.fillRoundedRect(w / 2 - 370, -22, 175, 44, 14);
        bestBg.lineStyle(2, 0xFFD700, 0.9);
        bestBg.strokeRoundedRect(w / 2 - 370, -22, 175, 44, 14);

        const bestText = this.add.text(w / 2 - 370 + 87, 0, `👑 BEST: ${bestScore}`, {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '17px',
            fontStyle: 'bold',
            color: '#FFD700'
        }).setOrigin(0.5);

        // Fly Button
        const btnBg = this.add.graphics();
        btnBg.fillStyle(0xFF6F00, 1);
        btnBg.fillRoundedRect(w / 2 - 170, -24, 145, 48, 24);
        btnBg.lineStyle(2, 0xFFD54F, 1);
        btnBg.strokeRoundedRect(w / 2 - 170, -24, 145, 48, 24);

        const btnText = this.add.text(w / 2 - 170 + 72, 0, '▶ FLY NOW', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '18px',
            fontStyle: 'bold',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        card.add([cardBg, plane, badgeBg, badgeText, titleText, subText, bestBg, bestText, btnBg, btnText]);
        card.setSize(w, h);
        card.setInteractive({ useHandCursor: true });

        card.on('pointerover', () => {
            card.setScale(1.02);
            cardBg.clear();
            cardBg.fillStyle(0x102550, 0.98);
            cardBg.fillRoundedRect(-w / 2, -h / 2, w, h, 20);
            cardBg.lineStyle(4, 0x00FFFF, 1);
            cardBg.strokeRoundedRect(-w / 2, -h / 2, w, h, 20);
        });

        card.on('pointerout', () => {
            card.setScale(1.0);
            cardBg.clear();
            cardBg.fillStyle(0x0a142c, 0.95);
            cardBg.fillRoundedRect(-w / 2, -h / 2, w, h, 20);
            cardBg.lineStyle(3, 0x00E5FF, 1);
            cardBg.strokeRoundedRect(-w / 2, -h / 2, w, h, 20);
        });

        card.on('pointerdown', () => {
            if (window.SoundEffects) window.SoundEffects.playJump();
            this.cameras.main.fade(300, 0, 0, 0);
            this.time.delayedCall(300, () => {
                this.scene.start('SkyDashScene');
            });
        });
    }
}


// --- 3. LEVEL SCENE (DATA-DRIVEN) ---
class LevelScene extends Phaser.Scene {
    constructor() {
        super('LevelScene');
    }

    init(data) {
        this.levelId = data && data.levelId ? data.levelId : 'level1';
        this.config = window.LevelConfigs && window.LevelConfigs[this.levelId]
            ? window.LevelConfigs[this.levelId]
            : window.LevelConfigs.level1;

        // Player state
        this.lives = 3;
        this.score = 0;
        this.modakCount = 0;
        this.ganeshaCoinCount = 0;
        this.cheeseCount = 0;
        this.stompedCats = 0;
        this.isBig = false;          // Big Mushak power-up state (Mario mushroom)
        this.isInvulnerable = false;
        this.isRespawning = false;
        this.isLevelOver = false;

        // Physics velocity tracking (for accurate head hits and stomps)
        this.prevVelocityY = 0;
        this.jumpVelocity = -580; // Correct tuned jump velocity to clear obstacles easily
        this.cheeseMysteryTriggered = false; // Strictly 1 cheese mystery per level
        this.isPaused = false;
        this.pauseContainer = null;
        this.isWarping = false;
        this.warpHint = null;

        // Animation timing helper for running sprites
        this.runTimer = 0;
        this.currentRunFrame = 1;

        // Mobile touch controls state & auto-detection
        this.touchState = {
            left: false,
            right: false,
            down: false,
            jump: false,
            jumpJustPressed: false
        };
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth <= 1366) || (window.innerHeight <= 850);
        this.showTouchControls = isTouchDevice;
        this.mobileControlsContainer = null;
    }

    create() {
        const config = this.config;
        const worldWidth = config.worldWidth;
        const worldHeight = config.worldHeight || 720;

        // Set physics world bounds
        this.physics.world.setBounds(0, 0, worldWidth, worldHeight + 200);

        // 1. Parallax Repeating Background
        this.bg = this.add.tileSprite(0, 0, 1280, 720, 'background');
        this.bg.setOrigin(0, 0);
        this.bg.setScrollFactor(0);
        this.bg.setTileScale(0.452, 0.452);
        if (config.bgTint) {
            this.bg.setTint(config.bgTint);
        }

        // 2. Build Physics Groups
        this.groundGroup = this.physics.add.staticGroup();
        this.floatingGroup = this.physics.add.staticGroup();
        this.blocksGroup = this.physics.add.staticGroup(); // Rock-solid static bodies: 100% impenetrable!
        this.warpPipeGroup = this.physics.add.staticGroup();

        // Build Ground Segments (platform.png is native 256x80 repeating tile)
        config.groundSegments.forEach(seg => {
            const segWidth = seg.endX - seg.startX;
            const tile = this.add.tileSprite(seg.startX, config.groundY, segWidth, config.groundHeight, 'platform');
            tile.setOrigin(0, 0);

            // Add static body aligned to solid grass line (8px into grass) so all floor objects are intact with the floor
            this.physics.add.existing(tile, true);
            tile.body.setSize(segWidth, config.groundHeight - 8);
            tile.body.setOffset(0, 8);
            this.groundGroup.add(tile);
        });

        // Floating Platforms (lowered & easily reachable via normal running jump)
        if (config.floatingPlatforms) {
            config.floatingPlatforms.forEach(plat => {
                const p = this.floatingGroup.create(plat.x, plat.y, 'platform');
                p.setDisplaySize(plat.width, plat.height);
                p.refreshBody();
            });
        }

        // 3. Bricks (Solid brick1 & Question bricks scaled to 36x36 grid unit with exact physics bodies)
        const blockSize = 36;

        if (config.solidBricks) {
            config.solidBricks.forEach(brick => {
                const b = this.blocksGroup.create(brick.x, brick.y, 'brick1');
                b.setDisplaySize(blockSize, blockSize);
                b.blockType = 'solid';
                b.refreshBody(); // Exact 36x36 static body aligned to brick position
            });
        }

        if (config.questionBricks && config.questionBricks.length > 0) {
            // Pick a completely random question block for the single cheese power-up!
            // Cheese is never guaranteed to be in the first block; it is randomized every run!
            const randomCheeseIdx = Phaser.Math.Between(0, config.questionBricks.length - 1);
            config.questionBricks.forEach((q, idx) => {
                const qb = this.blocksGroup.create(q.x, q.y, 'brick_with_questionmark');
                qb.setDisplaySize(blockSize, blockSize);
                qb.blockType = 'question';
                qb.hasItem = true;
                // Exactly 1 randomized brick contains the cheese powerup; all other question bricks contain divine Ganesha Coins!
                if (idx === randomCheeseIdx) {
                    qb.itemType = 'cheese';
                } else {
                    qb.itemType = 'ganesha_coin';
                }
                qb.refreshBody(); // Exact 36x36 static body aligned to question block position
            });
        }

        // Warp Pipes (warp_pipe.png native 70x120) sitting flush on ground
        this.warpPipeList = [];
        if (config.warpPipes) {
            config.warpPipes.forEach(pipe => {
                const wp = this.warpPipeGroup.create(pipe.x, pipe.y, 'warp_pipe');
                wp.setDisplaySize(pipe.width, pipe.height);
                wp.refreshBody();
                wp.pipeConfig = pipe;
                this.warpPipeList.push(wp);

                // Subtle visual glow/indicator for linked warp tunnel pipes
                if (pipe.isWarp) {
                    const swirl = this.add.text(pipe.x, pipe.y - pipe.height / 2 - 12, '🌀', {
                        fontSize: '18px'
                    }).setOrigin(0.5);
                    this.tweens.add({
                        targets: swirl,
                        y: pipe.y - pipe.height / 2 - 18,
                        alpha: { from: 0.6, to: 1.0 },
                        duration: 800,
                        yoyo: true,
                        repeat: -1
                    });
                }
            });
        }

        // 4. Goal: Ganesh Pandal (ganesh_pandal_image.png native 280x220)
        const goalData = config.goal;
        this.goal = this.physics.add.staticSprite(goalData.x, goalData.y, 'ganesh_pandal_image');
        this.goal.refreshBody();

        this.tweens.add({
            targets: this.goal,
            alpha: { from: 0.92, to: 1.0 },
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // 5. Collectibles: Modaks (Coins) & Cheeses (Super Mushrooms)
        this.modakGroup = this.physics.add.group({ allowGravity: false, immovable: true });
        this.cheeseGroup = this.physics.add.group({ allowGravity: true, bounceX: 1, collideWorldBounds: true });

        // Cheese collides with platforms, ground, bricks, and pipes just like a Super Mushroom
        this.physics.add.collider(this.cheeseGroup, this.groundGroup);
        this.physics.add.collider(this.cheeseGroup, this.blocksGroup);
        this.physics.add.collider(this.cheeseGroup, this.warpPipeGroup);
        this.physics.add.collider(this.cheeseGroup, this.floatingGroup);

        if (config.collectibles) {
            config.collectibles.forEach(col => {
                if (col.type === 'modak') {
                    const m = this.modakGroup.create(col.x, col.y, 'modak');
                    m.setDisplaySize(36, 36);
                    // Mario-coin style idle pulse and gentle bob
                    this.tweens.add({
                        targets: m,
                        y: col.y - 7,
                        scaleX: 0.88,
                        duration: 650 + Math.random() * 200,
                        yoyo: true,
                        repeat: -1,
                        ease: 'Sine.easeInOut'
                    });
                }
            });
        }

        // 6. Enemies: Patrolling Cats (cat_obstical.png scaled to 40x48 - proportionate, slightly shorter than Mushak)
        this.enemyGroup = this.physics.add.group({ allowGravity: true, bounceX: 1 });
        if (config.enemies) {
            config.enemies.forEach(en => {
                const cat = this.enemyGroup.create(en.x, en.y, 'cat_obstical');
                cat.setDisplaySize(40, 48);
                cat.body.setSize(34, 44);
                cat.body.setOffset(3, 2);
                cat.setCollideWorldBounds(true);
                cat.minX = en.minX;
                cat.maxX = en.maxX;
                cat.patrolSpeed = en.speed || 80;
                cat.setVelocityX(cat.patrolSpeed);
                cat.isDefeated = false;
            });
        }

        // Cat collisions with ground and obstacles
        this.physics.add.collider(this.enemyGroup, this.groundGroup);
        this.physics.add.collider(this.enemyGroup, this.blocksGroup);
        this.physics.add.collider(this.enemyGroup, this.warpPipeGroup);

        // 7. Player: Mushak (height ~70px)
        const pStart = config.playerStart || { x: 140, y: 590 };
        this.player = this.physics.add.sprite(pStart.x, pStart.y, 'standing_mushak');
        this.setPlayerSprite('standing_mushak');
        this.player.setCollideWorldBounds(false); // Can fall into gaps
        this.player.lastSafeX = pStart.x;
        this.player.lastSafeY = pStart.y;

        // Player colliders with ground, floating platforms, bricks, and warp pipe
        this.physics.add.collider(this.player, this.groundGroup, () => {
            if (this.player.body.touching.down && this.player.y < config.groundY) {
                this.player.lastSafeX = this.player.x;
                this.player.lastSafeY = this.player.y;
            }
        });
        this.physics.add.collider(this.player, this.floatingGroup, () => {
            if (this.player.body.touching.down) {
                this.player.lastSafeX = this.player.x;
                this.player.lastSafeY = this.player.y;
            }
        });

        // Working collider for ALL blocks (solid and question blocks):
        // Allows player to stand on top, land on them, and be blocked by sides!
        this.physics.add.collider(this.player, this.blocksGroup, this.handleBlockCollision, null, this);
        this.physics.add.collider(this.player, this.warpPipeGroup);

        // Overlaps: Collectibles & Goal (overlap-only, NO collision blocking)
        this.physics.add.overlap(this.player, this.modakGroup, this.collectModak, null, this);
        this.physics.add.overlap(this.player, this.cheeseGroup, this.collectCheese, null, this);
        this.physics.add.overlap(this.player, this.goal, this.reachGoal, null, this);

        // Player vs Enemies (Stomp or Damage)
        this.physics.add.collider(this.player, this.enemyGroup, this.handleEnemyCollision, null, this);

        // 8. Camera Configuration
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08, -100, 30);

        // 9. Input Keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        // Pause / Restart / Menu hotkeys
        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // 10. HUD Interface
        this.createHUD();

        // 11. Mobile Touch Controls (D-Pad & Jump)
        this.createMobileControls();

        // 12. Reversed Controls Warning for Level 6 (Rage Round)
        if (config.reversedControls) {
            this.showReversedControlsWarning();
        }
    }

    createHUD() {
        this.hudContainer = this.add.container(0, 0);
        this.hudContainer.setScrollFactor(0);
        this.hudContainer.setDepth(100);

        // Top bar backdrop
        const hudBg = this.add.graphics();
        hudBg.fillStyle(0x000000, 0.72);
        hudBg.fillRect(0, 0, 1280, 56);
        hudBg.lineStyle(2, 0xFFB300, 0.8);
        hudBg.lineBetween(0, 56, 1280, 56);
        this.hudContainer.add(hudBg);

        // Lives label & hearts
        const livesLabel = this.add.text(20, 16, 'LIVES:', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '17px',
            fontStyle: 'bold',
            color: '#FFD54F'
        });
        this.hudContainer.add(livesLabel);

        this.heartIcons = [];
        for (let i = 0; i < 3; i++) {
            const heart = this.add.text(82 + (i * 26), 14, '❤️', {
                fontSize: '20px'
            });
            this.heartIcons.push(heart);
            this.hudContainer.add(heart);
        }

        // Big Mushak Power-Up Indicator
        this.powerBadge = this.add.text(172, 16, '⭐ BIG', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '14px',
            fontStyle: 'bold',
            color: '#FFD700',
            stroke: '#B71C1C',
            strokeThickness: 3
        });
        this.powerBadge.setVisible(false);
        this.hudContainer.add(this.powerBadge);

        // Level Title in center
        const levelTitle = this.add.text(375, 20, this.config.title || 'LEVEL 1', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '17px',
            fontStyle: 'bold',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        this.hudContainer.add(levelTitle);

        // Ganesha Coin count
        const coinIcon = this.add.image(495, 28, 'ganesha_coin').setDisplaySize(18, 27);
        this.hudContainer.add(coinIcon);

        this.coinText = this.add.text(512, 16, 'x 0', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '18px',
            fontStyle: 'bold',
            color: '#FFF275'
        });
        this.hudContainer.add(this.coinText);

        // Modak count
        const modakIcon = this.add.image(595, 28, 'modak').setDisplaySize(26, 26);
        this.hudContainer.add(modakIcon);

        this.modakText = this.add.text(615, 16, 'x 0', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '18px',
            fontStyle: 'bold',
            color: '#FFD54F'
        });
        this.hudContainer.add(this.modakText);

        // Score display
        this.scoreText = this.add.text(700, 16, 'SCORE: 0', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '18px',
            fontStyle: 'bold',
            color: '#FFF275'
        });
        this.hudContainer.add(this.scoreText);

        // Top bar action buttons: Touch Toggle, Pause, Restart, Menu
        this.touchBtn = this.createTopBarButton(885, 28, 92, 34, '📱 Touch', 0x00695C, 0x80CBC4, () => this.toggleTouchControls());
        this.createTopBarButton(985, 28, 88, 34, '⏸️ Pause', 0x4A148C, 0xCE93D8, () => this.togglePause());
        this.createTopBarButton(1085, 28, 92, 34, '↺ Restart', 0xB71C1C, 0xEF5350, () => this.restartLevel());
        this.createTopBarButton(1190, 28, 88, 34, '⌂ Menu', 0x1B5E20, 0x81C784, () => this.scene.start('MenuScene'));
    }

    createMobileControls() {
        if (this.mobileControlsContainer) {
            this.mobileControlsContainer.destroy();
        }

        const container = this.add.container(0, 0);
        container.setScrollFactor(0);
        container.setDepth(150); // Above gameplay and parallax tiles
        this.mobileControlsContainer = container;

        // 1. Left Direction Button (◀)
        const leftBtn = this.createTouchButton(95, 605, 42, '◀', '', 0x12081c, 0xFFA000, (down) => {
            this.touchState.left = down;
        });
        container.add(leftBtn);

        // 2. Right Direction Button (▶)
        const rightBtn = this.createTouchButton(205, 605, 42, '▶', '', 0x12081c, 0xFFA000, (down) => {
            this.touchState.right = down;
        });
        container.add(rightBtn);

        // 3. Down / Enter Warp Pipe Button (▼)
        const downBtn = this.createTouchButton(150, 510, 32, '▼', 'WARP', 0x12081c, 0x76FF03, (down) => {
            this.touchState.down = down;
        });
        container.add(downBtn);

        // 4. Jump Action Button (▲ JUMP)
        const jumpBtn = this.createTouchButton(1180, 595, 52, '▲', 'JUMP', 0xBF360C, 0xFFD700, (down) => {
            this.touchState.jump = down;
            if (down) {
                this.touchState.jumpJustPressed = true;
            }
        });
        container.add(jumpBtn);

        container.setVisible(this.showTouchControls);
    }

    createTouchButton(x, y, radius, symbol, label, fillColor, strokeColor, onStateChange) {
        const btn = this.add.container(x, y);

        // Circular glassmorphism background
        const bg = this.add.graphics();
        bg.fillStyle(fillColor, 0.74);
        bg.fillCircle(0, 0, radius);
        bg.lineStyle(3, strokeColor, 0.95);
        bg.strokeCircle(0, 0, radius);

        // Outer glow accent ring
        const glow = this.add.graphics();
        glow.lineStyle(1.5, 0xFFFFFF, 0.4);
        glow.strokeCircle(0, 0, radius - 4);

        const items = [bg, glow];

        if (label) {
            const sym = this.add.text(0, -9, symbol, {
                fontFamily: 'Trebuchet MS, sans-serif',
                fontSize: `${Math.round(radius * 0.65)}px`,
                fontStyle: 'bold',
                color: '#FFFFFF'
            }).setOrigin(0.5);

            const lbl = this.add.text(0, 15, label, {
                fontFamily: 'Trebuchet MS, sans-serif',
                fontSize: `${Math.round(radius * 0.3)}px`,
                fontStyle: 'bold',
                color: strokeColor === 0x76FF03 ? '#B9F6CA' : '#FFF9C4'
            }).setOrigin(0.5);

            items.push(sym, lbl);
        } else {
            const sym = this.add.text(0, 0, symbol, {
                fontFamily: 'Trebuchet MS, sans-serif',
                fontSize: `${Math.round(radius * 0.75)}px`,
                fontStyle: 'bold',
                color: '#FFFFFF'
            }).setOrigin(0.5);
            items.push(sym);
        }

        btn.add(items);
        btn.setSize(radius * 2, radius * 2);
        btn.setInteractive(new Phaser.Geom.Circle(0, 0, radius), Phaser.Geom.Circle.Contains);

        const setPressedVisuals = (pressed) => {
            if (pressed) {
                btn.setScale(0.90);
                bg.clear();
                bg.fillStyle(fillColor, 0.95);
                bg.fillCircle(0, 0, radius);
                bg.lineStyle(4, 0xFFFFFF, 1);
                bg.strokeCircle(0, 0, radius);
            } else {
                btn.setScale(1.0);
                bg.clear();
                bg.fillStyle(fillColor, 0.74);
                bg.fillCircle(0, 0, radius);
                bg.lineStyle(3, strokeColor, 0.95);
                bg.strokeCircle(0, 0, radius);
            }
        };

        btn.on('pointerdown', () => {
            setPressedVisuals(true);
            onStateChange(true);
        });

        btn.on('pointerup', () => {
            setPressedVisuals(false);
            onStateChange(false);
        });

        btn.on('pointerout', () => {
            setPressedVisuals(false);
            onStateChange(false);
        });

        return btn;
    }

    toggleTouchControls() {
        this.showTouchControls = !this.showTouchControls;
        if (this.mobileControlsContainer) {
            this.mobileControlsContainer.setVisible(this.showTouchControls);
        }
        if (window.SoundEffects) window.SoundEffects.playModak();
    }

    resetTouchState() {
        if (this.touchState) {
            this.touchState.left = false;
            this.touchState.right = false;
            this.touchState.down = false;
            this.touchState.jump = false;
            this.touchState.jumpJustPressed = false;
        }
    }

    createTopBarButton(x, y, w, h, text, color, strokeColor, onClick) {
        const btn = this.add.container(x, y);
        const bg = this.add.graphics();
        bg.fillStyle(color, 0.9);
        bg.fillRoundedRect(-w / 2, -h / 2, w, h, 8);
        bg.lineStyle(2, strokeColor, 1);
        bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 8);

        const txt = this.add.text(0, 0, text, {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '14px',
            fontStyle: 'bold',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        btn.add([bg, txt]);
        btn.setSize(w, h);
        btn.setInteractive({ useHandCursor: true });

        btn.on('pointerover', () => btn.setScale(1.06));
        btn.on('pointerout', () => btn.setScale(1.0));
        btn.on('pointerdown', () => {
            if (window.SoundEffects) window.SoundEffects.playJump();
            onClick();
        });

        this.hudContainer.add(btn);
        return btn;
    }

    updateHUD() {
        for (let i = 0; i < this.heartIcons.length; i++) {
            this.heartIcons[i].setText(i < this.lives ? '❤️' : '🖤');
        }
        this.powerBadge.setVisible(this.isBig);
        if (this.coinText) this.coinText.setText('x ' + (this.ganeshaCoinCount || 0));
        this.modakText.setText('x ' + this.modakCount);
        this.scoreText.setText('SCORE: ' + this.score);
    }

    // PAUSE & RESTART MANAGEMENT
    togglePause() {
        if (this.isLevelOver) return;
        if (this.isPaused) {
            this.resumeGame();
        } else {
            this.pauseGame();
        }
    }

    pauseGame() {
        if (this.isPaused || this.isLevelOver) return;
        this.isPaused = true;
        this.resetTouchState();
        if (this.mobileControlsContainer) {
            this.mobileControlsContainer.setVisible(false);
        }
        this.physics.pause();

        const width = 1280;
        const height = 720;

        const container = this.add.container(0, 0).setDepth(300).setScrollFactor(0);
        this.pauseContainer = container;

        // Dark dim backdrop
        const dimmer = this.add.graphics();
        dimmer.fillStyle(0x000000, 0.82);
        dimmer.fillRect(0, 0, width, height);
        dimmer.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
        container.add(dimmer);

        // Pause Modal Card
        const modal = this.add.graphics();
        modal.fillStyle(0x1a0f28, 0.96);
        modal.fillRoundedRect(width / 2 - 240, height / 2 - 210, 480, 420, 20);
        modal.lineStyle(3, 0xFFB300, 1);
        modal.strokeRoundedRect(width / 2 - 240, height / 2 - 210, 480, 420, 20);
        container.add(modal);

        // Title
        const title = this.add.text(width / 2, height / 2 - 160, '⏸️ GAME PAUSED', {
            fontFamily: 'Trebuchet MS, Impact, sans-serif',
            fontSize: '36px',
            fontStyle: '900',
            color: '#FFD54F',
            stroke: '#B71C1C',
            strokeThickness: 5
        }).setOrigin(0.5);
        container.add(title);

        const lvlTxt = this.add.text(width / 2, height / 2 - 110, this.config.title || 'Level 1', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '18px',
            color: '#ECEFF1'
        }).setOrigin(0.5);
        container.add(lvlTxt);

        const scoreStats = this.add.text(width / 2, height / 2 - 75, `Score: ${this.score}  •  🪙 Coins: ${this.ganeshaCoinCount || 0}  •  Modaks: ${this.modakCount}`, {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '16px',
            fontStyle: 'bold',
            color: '#FFD54F'
        }).setOrigin(0.5);
        container.add(scoreStats);

        // Action Buttons: Resume, Restart, Choose Level, Main Menu
        const btnConfigs = [
            { label: '▶ RESUME', color: 0x2E7D32, stroke: 0xA5D6A7, y: -25, action: () => this.resumeGame() },
            { label: '↺ RESTART LEVEL', color: 0xD32F2F, stroke: 0xFF8A80, y: 35, action: () => this.restartLevel() },
            {
                label: '🗺️ CHOOSE LEVEL', color: 0x6A1B9A, stroke: 0xCE93D8, y: 95, action: () => {
                    this.physics.resume();
                    this.scene.start('LevelSelectScene');
                }
            },
            {
                label: '⌂ MAIN MENU', color: 0x37474F, stroke: 0x90A4AE, y: 155, action: () => {
                    this.physics.resume();
                    this.scene.start('MenuScene');
                }
            }
        ];

        btnConfigs.forEach(bc => {
            const b = this.add.container(width / 2, height / 2 + bc.y);
            const bg = this.add.graphics();
            bg.fillStyle(bc.color, 1);
            bg.fillRoundedRect(-140, -22, 280, 44, 22);
            bg.lineStyle(2, bc.stroke, 1);
            bg.strokeRoundedRect(-140, -22, 280, 44, 22);

            const t = this.add.text(0, 0, bc.label, {
                fontFamily: 'Trebuchet MS, sans-serif',
                fontSize: '18px',
                fontStyle: 'bold',
                color: '#FFFFFF'
            }).setOrigin(0.5);

            b.add([bg, t]);
            b.setSize(280, 44);
            b.setInteractive({ useHandCursor: true });

            b.on('pointerover', () => b.setScale(1.04));
            b.on('pointerout', () => b.setScale(1.0));
            b.on('pointerdown', () => {
                if (window.SoundEffects) window.SoundEffects.playJump();
                bc.action();
            });

            container.add(b);
        });
    }

    resumeGame() {
        if (!this.isPaused) return;
        this.isPaused = false;
        this.resetTouchState();
        if (this.pauseContainer) {
            this.pauseContainer.destroy();
            this.pauseContainer = null;
        }
        if (this.mobileControlsContainer) {
            this.mobileControlsContainer.setVisible(this.showTouchControls);
        }
        this.physics.resume();
    }

    restartLevel() {
        this.resetTouchState();
        if (window.SoundEffects) window.SoundEffects.playJump();
        if (this.pauseContainer) {
            this.pauseContainer.destroy();
            this.pauseContainer = null;
        }
        this.physics.resume();
        this.scene.start('LevelScene', { levelId: this.levelId });
    }

    setPlayerSprite(textureKey) {
        const baseDims = {
            'standing_mushak': { w: 38, h: 70 },
            'mushak_running_1': { w: 60, h: 70 },
            'mushak_running_2': { w: 56, h: 70 },
            'jumping_mushak': { w: 50, h: 70 }
        };
        const dim = baseDims[textureKey] || { w: 40, h: 70 };
        const mult = this.isBig ? 1.45 : 1.0;

        const textureChanged = this.player.texture.key !== textureKey;
        const stateChanged = this.player._lastIsBig !== this.isBig;

        if (textureChanged) {
            this.player.setTexture(textureKey);
        }

        this.player.setDisplaySize(dim.w * mult, dim.h * mult);

        if (textureChanged || stateChanged) {
            this.player._lastIsBig = this.isBig;
            // Native texture height is 84px for all Mushak textures.
            // Using source collision box 30 x 80 with offset.y = (84 - 80) = 4 ensures:
            // body.bottom is mathematically identical to visual feet at all scales (small 1.0x or big 1.45x),
            // completely preventing the rat from floating in mid-air or sinking into tiles!
            const sourceW = 30;
            const sourceH = 80;
            this.player.body.setSize(sourceW, sourceH, false);
            this.player.body.setOffset(
                (this.player.width - sourceW) / 2,
                this.player.height - sourceH
            );
        }
    }

    update(time, delta) {
        if (this.isLevelOver || this.isRespawning || this.isWarping) return;

        // Check hotkeys for Pause (P / ESC) and Restart (R)
        if (Phaser.Input.Keyboard.JustDown(this.pauseKey) || Phaser.Input.Keyboard.JustDown(this.escKey)) {
            this.togglePause();
            return;
        }
        if (Phaser.Input.Keyboard.JustDown(this.restartKey)) {
            this.restartLevel();
            return;
        }
        if (this.isPaused) return;

        // Store vertical velocity prior to collision resolution
        this.prevVelocityY = this.player.body.velocity.y;

        // Parallax background scrolling
        this.bg.tilePositionX = this.cameras.main.scrollX * 0.35;

        const cursors = this.cursors;
        const wasd = this.wasd;
        const player = this.player;

        const onGround = player.body.blocked.down || player.body.touching.down;

        // --- 1. Warp Pipe Tunnel Detection ---
        let standingOnWarp = null;
        if (this.warpPipeList) {
            for (const wp of this.warpPipeList) {
                if (!wp.pipeConfig || !wp.pipeConfig.isWarp) continue;
                const withinX = Math.abs(player.x - wp.x) < (wp.displayWidth / 2 - 6);
                const pipeTop = wp.y - wp.displayHeight / 2;
                const feetAtTop = Math.abs(player.body.bottom - pipeTop) < 10;
                if (withinX && feetAtTop && onGround) {
                    standingOnWarp = wp;
                    break;
                }
            }
        }

        if (standingOnWarp && !this.isWarping) {
            if (!this.warpHint) {
                this.warpHint = this.add.text(standingOnWarp.x, standingOnWarp.y - standingOnWarp.displayHeight / 2 - 34, '▼ Press DOWN / S to Warp ▼', {
                    fontFamily: 'Trebuchet MS, sans-serif',
                    fontSize: '15px',
                    fontStyle: 'bold',
                    color: '#76FF03',
                    stroke: '#000000',
                    strokeThickness: 4
                }).setOrigin(0.5).setDepth(25);

                this.tweens.add({
                    targets: this.warpHint,
                    y: standingOnWarp.y - standingOnWarp.displayHeight / 2 - 42,
                    duration: 400,
                    yoyo: true,
                    repeat: -1
                });
            } else {
                this.warpHint.setPosition(standingOnWarp.x, standingOnWarp.y - standingOnWarp.displayHeight / 2 - 34);
                this.warpHint.setVisible(true);
            }

            // Down key triggers warp
            if (cursors.down.isDown || wasd.down.isDown || (this.touchState && this.touchState.down)) {
                this.warpPlayer(standingOnWarp);
                return;
            }
        } else if (this.warpHint) {
            this.warpHint.setVisible(false);
        }

        // --- 2. Horizontal Movement (Reversed in Level 6) ---
        const touch = this.touchState || { left: false, right: false, down: false, jump: false, jumpJustPressed: false };
        const rawLeft = cursors.left.isDown || wasd.left.isDown || touch.left;
        const rawRight = cursors.right.isDown || wasd.right.isDown || touch.right;
        const isReversed = !!this.config.reversedControls;
        const isLeft = isReversed ? rawRight : rawLeft;
        const isRight = isReversed ? rawLeft : rawRight;

        const moveSpeed = 290;
        if (isLeft) {
            player.setVelocityX(-moveSpeed);
            player.setFlipX(true);
        } else if (isRight) {
            player.setVelocityX(moveSpeed);
            player.setFlipX(false);
        } else {
            player.setVelocityX(0);
        }

        // --- Jump Arc ---
        const isJumpJustDown = Phaser.Input.Keyboard.JustDown(cursors.up) ||
            Phaser.Input.Keyboard.JustDown(cursors.space) ||
            Phaser.Input.Keyboard.JustDown(wasd.up) ||
            Phaser.Input.Keyboard.JustDown(wasd.space) ||
            touch.jumpJustPressed;
        const isJumpHeld = cursors.up.isDown || cursors.space.isDown || wasd.up.isDown || wasd.space.isDown || touch.jump;

        // Reset one-shot touch jump press flag
        touch.jumpJustPressed = false;

        if (isJumpJustDown && onGround) {
            player.setVelocityY(this.jumpVelocity);
            this.prevVelocityY = this.jumpVelocity;
            if (window.SoundEffects) window.SoundEffects.playJump();
        }

        // Variable jump height: release early for smaller hop, hold for full leap
        if (!isJumpHeld && player.body.velocity.y < -100) {
            player.setVelocityY(player.body.velocity.y * 0.65);
        }

        // --- Dynamic Sprite Animation ---
        if (!onGround) {
            this.setPlayerSprite('jumping_mushak');
        } else if (isLeft || isRight) {
            this.runTimer += delta;
            if (this.runTimer > 115) {
                this.runTimer = 0;
                this.currentRunFrame = this.currentRunFrame === 1 ? 2 : 1;
                const nextKey = this.currentRunFrame === 1 ? 'mushak_running_1' : 'mushak_running_2';
                this.setPlayerSprite(nextKey);
            }
        } else {
            this.setPlayerSprite('standing_mushak');
        }

        // --- Enemy Patrol Logic ---
        this.enemyGroup.getChildren().forEach(cat => {
            if (cat.isDefeated) return;
            if (cat.x >= cat.maxX) {
                cat.setVelocityX(-cat.patrolSpeed);
                cat.setFlipX(false);
            } else if (cat.x <= cat.minX) {
                cat.setVelocityX(cat.patrolSpeed);
                cat.setFlipX(true);
            }
        });

        // --- Bottom Pit Detection ---
        if (player.y > 750 && !this.isRespawning) {
            this.handlePitFall();
        }
    }

    handleBlockCollision(player, block) {
        if (!block.active) return;

        // Player stands on top of block
        if (player.body.touching.down || (player.body.bottom <= block.y - 10 && this.prevVelocityY >= 0)) {
            player.lastSafeX = player.x;
            player.lastSafeY = player.y;
            return;
        }

        // Hit from underneath check
        const isUnderneath = (player.body.y >= block.y + 4);
        const isHorizontallyAligned = Math.abs(player.body.center.x - block.x) < 24;
        const isMovingUp = this.prevVelocityY < 0 || player.body.velocity.y < 0;

        if (isHorizontallyAligned && isUnderneath && isMovingUp) {
            // Stop upward momentum immediately (classic Mario head bump)
            player.setVelocityY(Math.max(0, player.body.velocity.y));

            if (block.blockType === 'question' && block.hasItem) {
                this.triggerQuestionBlock(block);
            } else if (block.blockType === 'solid') {
                if (this.isBig && !block.isUsed) {
                    // Big Mushak breaks brick1!
                    this.breakBrick(block);
                } else {
                    // Small Mushak bumps without breaking
                    this.bumpBrick(block);
                }
            }
        }
    }

    // Bump solid brick when hit from below
    bumpBrick(block) {
        if (window.SoundEffects) window.SoundEffects.playBlockHit();
        const origY = block.y;
        this.tweens.add({
            targets: block,
            y: origY - 8,
            duration: 70,
            yoyo: true,
            ease: 'Quad.easeOut',
            onUpdate: () => block.refreshBody(),
            onComplete: () => {
                block.y = origY;
                block.refreshBody();
            }
        });
    }

    // Question block: hit from below pops out CHEESE powerup (1 per level) or a golden Modak!
    triggerQuestionBlock(block) {
        if (!block.hasItem) return;
        block.hasItem = false;
        block.isUsed = true;
        if (window.SoundEffects) window.SoundEffects.playBlockHit();

        // Spring bounce tween for block
        const origY = block.y;
        this.tweens.add({
            targets: block,
            y: origY - 8,
            duration: 70,
            yoyo: true,
            ease: 'Quad.easeOut',
            onUpdate: () => block.refreshBody(),
            onComplete: () => {
                block.y = origY;
                block.refreshBody();
            }
        });

        // Swap texture to plain used brick1
        block.setTexture('brick1');
        block.setDisplaySize(36, 36);
        block.blockType = 'solid'; // Now acts as an empty inert solid brick
        block.refreshBody();

        const isCheese = (block.itemType === 'cheese' && !this.cheeseMysteryTriggered);

        if (isCheese) {
            this.cheeseMysteryTriggered = true;
            // Spawn Super Mushroom-style Cheese!
            const cheese = this.cheeseGroup.create(block.x, block.y - 14, 'cheese');
            cheese.setDisplaySize(34, 30);
            cheese.body.setSize(30, 26);
            cheese.body.setAllowGravity(false);
            cheese.body.enable = false;
            cheese.isSpawning = true;
            cheese.setDepth(5); // In front of block

            // 1. Smoothly emerges upward out of the block (classic Mario mushroom emergence)
            this.tweens.add({
                targets: cheese,
                y: block.y - 36,
                duration: 350,
                ease: 'Linear',
                onComplete: () => {
                    if (!cheese.active) return;
                    cheese.isSpawning = false;
                    cheese.body.enable = true;
                    cheese.body.setAllowGravity(true);
                    cheese.body.setBounce(1, 0); // Bounces off walls/pipes
                    cheese.body.setCollideWorldBounds(true);
                    // 2. Once emerged, slides horizontally forward along platforms like a Mario mushroom!
                    cheese.setVelocityX(90);
                }
            });
        } else if (block.itemType === 'ganesha_coin') {
            // Sacred Ganesha Collectible Coin reward!
            if (window.SoundEffects) window.SoundEffects.playModak();
            this.score += 25;
            this.ganeshaCoinCount = (this.ganeshaCoinCount || 0) + 1;
            this.updateHUD();
            this.showFloatingText(block.x, block.y - 22, '+25 GANESHA COIN! 🪙', '#FFD700');

            // 3D Coin medallion emerges and spins in air like a classic Mario coin!
            const popCoin = this.add.image(block.x, block.y - 16, 'ganesha_coin').setDisplaySize(28, 42).setDepth(6);
            this.tweens.add({
                targets: popCoin,
                y: block.y - 68,
                scaleX: { from: 1.0, to: 0.15 },
                duration: 380,
                yoyo: true,
                repeat: 1,
                ease: 'Quad.easeOut',
                onComplete: () => {
                    this.tweens.add({
                        targets: popCoin,
                        y: block.y - 92,
                        alpha: 0,
                        duration: 220,
                        ease: 'Linear',
                        onComplete: () => popCoin.destroy()
                    });
                }
            });
        } else {
            // Golden Modak reward popping out like a Mario coin!
            if (window.SoundEffects) window.SoundEffects.playModak();
            this.score += 10;
            this.modakCount += 1;
            this.updateHUD();
            this.showFloatingText(block.x, block.y - 20, '+10 MODAK', '#FFD700');

            const popModak = this.add.image(block.x, block.y - 16, 'modak').setDisplaySize(32, 32).setDepth(6);
            this.tweens.add({
                targets: popModak,
                y: block.y - 56,
                scaleX: 1.25,
                scaleY: 1.25,
                alpha: 0,
                duration: 480,
                ease: 'Quad.easeOut',
                onComplete: () => popModak.destroy()
            });
        }
    }

    // Big Mushak breaks brick1 block
    breakBrick(block) {
        if (!block.active) return;
        if (window.SoundEffects) window.SoundEffects.playBrickBreak();

        this.score += 5;
        this.updateHUD();
        this.showFloatingText(block.x, block.y - 20, '+5', '#FFD54F');

        // Particle debris scatter effect (4 tumbling brick fragments)
        for (let i = 0; i < 4; i++) {
            const debris = this.add.graphics();
            debris.fillStyle(0xCC6633, 1);
            debris.fillRect(-6, -6, 12, 12);
            debris.lineStyle(1, 0x883311, 1);
            debris.strokeRect(-6, -6, 12, 12);
            debris.x = block.x + (i % 2 === 0 ? -10 : 10);
            debris.y = block.y + (i < 2 ? -10 : 10);

            const vx = (i % 2 === 0 ? -1 : 1) * (90 + Math.random() * 60);
            const vy = -190 - Math.random() * 80;

            this.tweens.add({
                targets: debris,
                x: debris.x + vx,
                y: debris.y + 160,
                rotation: Math.PI * 2 * (i % 2 === 0 ? -1 : 1),
                alpha: 0,
                duration: 500,
                ease: 'Quad.easeIn',
                onComplete: () => debris.destroy()
            });
        }

        // Destroy the block and its collider
        block.destroy();
    }

    // Small Mushak bumps brick1 without breaking
    bumpBrick(block) {
        if (window.SoundEffects) window.SoundEffects.playBlockHit();

        const origY = block.y;
        this.tweens.add({
            targets: block,
            y: origY - 6,
            duration: 70,
            yoyo: true,
            ease: 'Quad.easeOut',
            onComplete: () => {
                block.y = origY;
            }
        });
    }

    // Modak Coin Behavior: overlap-only, immediate pop-tween, +10 pts
    collectModak(player, modak) {
        if (!modak.active) return;
        modak.disableBody(true, false); // Disable physics immediately
        this.score += 10;
        this.modakCount += 1;
        this.updateHUD();
        if (window.SoundEffects) window.SoundEffects.playModak();
        this.showFloatingText(modak.x, modak.y - 20, '+10', '#FFD700');

        // Mario-coin pop and fade
        this.tweens.add({
            targets: modak,
            scaleX: 1.4,
            scaleY: 1.4,
            y: modak.y - 24,
            alpha: 0,
            duration: 250,
            ease: 'Back.easeOut',
            onComplete: () => modak.destroy()
        });
    }

    // Cheese Super Mushroom Power-Up: transforms player into Big Mushak!
    collectCheese(player, cheese) {
        if (!cheese.active || cheese.isSpawning) return;
        cheese.disableBody(true, true); // Immediately remove from screen
        cheese.destroy();
        this.score += 5;
        this.cheeseCount += 1;
        this.updateHUD();

        if (!this.isBig) {
            this.growBigMushak();
        } else {
            if (window.SoundEffects) window.SoundEffects.playPowerUp();
            this.showFloatingText(player.x, player.y - 40, '+5 CHEESE!', '#FFD54F');
        }
    }

    growBigMushak() {
        if (this.isRespawning || this.isLevelOver) return;
        this.isBig = true;
        this.showFloatingText(this.player.x, this.player.y - 50, '⭐ BIG MUSHAK! ⭐', '#FFD700');
        if (window.SoundEffects) window.SoundEffects.playPowerUp();

        // 1. Invulnerability grace period during growth so nearby threats don't hurt during transformation
        this.isInvulnerable = true;
        this.time.delayedCall(1200, () => {
            if (!this.isRespawning) {
                this.isInvulnerable = false;
            }
        });

        // 2. Reposition center upwards by half the height expansion ((70 * 1.45 - 70) / 2 = 15.75px)
        // so Mushak's feet stay firmly grounded at the exact same floor level!
        this.player.y -= 15.75;
        this.setPlayerSprite(this.player.texture.key);

        // 6. Growth visual flash animation
        this.tweens.add({
            targets: this.player,
            alpha: 0.4,
            duration: 70,
            yoyo: true,
            repeat: 5,
            onComplete: () => {
                this.player.alpha = 1.0;
            }
        });

        this.updateHUD();
    }

    handleEnemyCollision(player, cat) {
        if (cat.isDefeated || this.isLevelOver) return;

        // Accurate Stomp vs Side Damage calculation
        // Stomp condition: Player was moving downwards (prevVelocityY > 0) AND
        // either Arcade Physics separated feet touching cat top, OR player bottom is above cat center
        const playerBottom = player.body.y + player.body.height;
        const catTop = cat.body.y;
        const isStomp = (player.body.touching.down && cat.body.touching.up) ||
            (this.prevVelocityY > 0 && playerBottom <= catTop + 24);

        if (isStomp) {
            // STOMP SUCCESS!
            cat.isDefeated = true;
            cat.setVelocityX(0);
            cat.body.enable = false;

            if (window.SoundEffects) window.SoundEffects.playStomp();

            // Automatic bounce: roughly half normal jump height (-350)
            player.setVelocityY(-350);

            // Squash & fade animation
            this.tweens.add({
                targets: cat,
                scaleY: 0.1,
                scaleX: 1.2,
                alpha: 0,
                duration: 250,
                onComplete: () => cat.destroy()
            });

            this.score += 20;
            this.stompedCats += 1;
            this.updateHUD();
            this.showFloatingText(cat.x, cat.y - 25, '+20 STOMP!', '#76FF03');
        } else {
            // SIDE/BOTTOM CONTACT: Damage behavior
            if (this.isInvulnerable) return;

            if (this.isBig) {
                // BIG MUSHAK DAMAGE SHIELD: Shrinks back to normal, NO life lost!
                this.isBig = false;
                this.showFloatingText(this.player.x, this.player.y - 50, 'SHRINK!', '#FF7043');
                if (window.SoundEffects) window.SoundEffects.playHurt();
                this.cameras.main.shake(160, 0.012);

                this.isInvulnerable = true;
                const knockDir = player.x < cat.x ? -1 : 1;
                player.setVelocity(knockDir * 180, -220);

                // Shrink back to normal size
                this.player.y += 15.75;
                this.setPlayerSprite(this.player.texture.key);

                // Invulnerability flashing for 1.5s
                this.tweens.add({
                    targets: player,
                    alpha: 0.25,
                    duration: 100,
                    yoyo: true,
                    repeat: 7,
                    onComplete: () => {
                        player.alpha = 1.0;
                        this.isInvulnerable = false;
                    }
                });

                this.updateHUD();
                return;
            }

            // Normal state: lose 1 life with 2-second respawn delay & notice
            this.handlePlayerDeath('cat');
        }
    }

    handlePitFall() {
        if (this.isLevelOver || this.isRespawning) return;
        this.handlePlayerDeath('pit');
    }

    handlePlayerDeath(cause) {
        if (this.isLevelOver || this.isRespawning) return;
        this.isRespawning = true;
        this.isBig = false;
        this.resetTouchState();
        this.setPlayerSprite('standing_mushak');

        this.lives -= 1;
        this.updateHUD();

        if (window.SoundEffects) window.SoundEffects.playHurt();
        this.cameras.main.shake(200, 0.018);

        // Freeze player movement & physics during the respawn delay
        this.player.setVelocity(0, 0);
        this.player.body.setAllowGravity(false);
        this.player.body.enable = false;

        if (this.lives <= 0) {
            this.triggerGameOver();
            return;
        }

        // Prominent 2-second Respawn Delay Banner
        const banner = this.add.container(640, 360).setScrollFactor(0).setDepth(300);
        const bg = this.add.graphics();
        bg.fillStyle(0x0a0514, 0.94);
        bg.fillRoundedRect(-240, -65, 480, 130, 18);
        bg.lineStyle(3, 0xD32F2F, 1);
        bg.strokeRoundedRect(-240, -65, 480, 130, 18);

        const heartIcon = this.add.text(0, -30, '💔 YOU LOST A LIFE!', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '26px',
            fontStyle: 'bold',
            color: '#FF5252',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        const livesLeft = this.add.text(0, 4, `Lives remaining: ${this.lives}`, {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '18px',
            fontStyle: 'bold',
            color: '#FFD54F'
        }).setOrigin(0.5);

        const countdownTxt = this.add.text(0, 34, 'Respawning in 2 seconds...', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '15px',
            color: '#ECEFF1'
        }).setOrigin(0.5);

        banner.add([bg, heartIcon, livesLeft, countdownTxt]);

        // Countdown tick at 1s
        this.time.delayedCall(1000, () => {
            if (countdownTxt && countdownTxt.active) {
                countdownTxt.setText('Respawning in 1 second...');
            }
        });

        // Exact 2-second delay before respawning
        this.time.delayedCall(2000, () => {
            banner.destroy();

            // Spawn at last safe checkpoint
            const spawnX = this.player.lastSafeX || 140;
            const spawnY = this.player.lastSafeY ? (this.player.lastSafeY - 20) : 590;
            this.player.setPosition(spawnX, spawnY);
            this.player.setVelocity(0, 0);
            this.player.body.enable = true;
            this.player.body.setAllowGravity(true);

            // Invulnerability flash for 1.5s
            this.isInvulnerable = true;
            this.tweens.add({
                targets: this.player,
                alpha: 0.25,
                duration: 100,
                yoyo: true,
                repeat: 7,
                onComplete: () => {
                    this.player.alpha = 1.0;
                    this.isInvulnerable = false;
                    this.isRespawning = false;
                }
            });
        });
    }

    warpPlayer(entryPipe) {
        if (this.isWarping || this.isRespawning || this.isLevelOver) return;
        this.isWarping = true;
        if (this.warpHint) this.warpHint.setVisible(false);

        const player = this.player;
        player.setVelocity(0, 0);
        player.body.setAllowGravity(false);
        player.body.enable = false;

        if (window.SoundEffects && window.SoundEffects.playWarp) {
            window.SoundEffects.playWarp();
        }

        const targetX = entryPipe.pipeConfig.targetX;
        const targetY = entryPipe.pipeConfig.targetY;
        const targetPipeH = entryPipe.pipeConfig.height || 90;

        // 1. Animate player sinking down into the entry pipe
        this.tweens.add({
            targets: player,
            y: entryPipe.y + 12,
            alpha: 0.15,
            duration: 320,
            ease: 'Quad.easeIn',
            onComplete: () => {
                // 2. Camera quick fade
                this.cameras.main.fade(220, 0, 0, 0);
                this.time.delayedCall(240, () => {
                    // Reposition player at target pipe
                    player.setPosition(targetX, targetY + 12);
                    this.cameras.main.scrollX = Math.max(0, targetX - 400);
                    this.cameras.main.fadeIn(220, 0, 0, 0);

                    if (window.SoundEffects && window.SoundEffects.playWarp) {
                        window.SoundEffects.playWarp();
                    }

                    // 3. Animate player emerging up out of the target pipe
                    const targetTopY = (targetY - targetPipeH / 2) - (this.isBig ? 50.75 : 35);
                    this.tweens.add({
                        targets: player,
                        y: targetTopY,
                        alpha: 1.0,
                        duration: 320,
                        ease: 'Quad.easeOut',
                        onComplete: () => {
                            player.body.enable = true;
                            player.body.setAllowGravity(true);
                            player.setVelocity(0, 0);
                            player.lastSafeX = targetX;
                            player.lastSafeY = targetTopY;
                            this.isWarping = false;
                        }
                    });
                });
            }
        });
    }

    showReversedControlsWarning() {
        const revBanner = this.add.container(640, 135).setScrollFactor(0).setDepth(200);
        const bBg = this.add.graphics();
        bBg.fillStyle(0xB71C1C, 0.95);
        bBg.fillRoundedRect(-290, -38, 580, 76, 18);
        bBg.lineStyle(3, 0xFFEB3B, 1);
        bBg.strokeRoundedRect(-290, -38, 580, 76, 18);

        const t1 = this.add.text(0, -13, '⚠ WARNING: CONTROLS REVERSED! ⚠', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '20px',
            fontStyle: 'bold',
            color: '#FFF9C4'
        }).setOrigin(0.5);

        const t2 = this.add.text(0, 15, '← Press RIGHT to move LEFT  |  Press LEFT to move RIGHT →', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '15px',
            fontStyle: 'bold',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        revBanner.add([bBg, t1, t2]);

        this.tweens.add({
            targets: revBanner,
            alpha: 0,
            delay: 4200,
            duration: 800,
            onComplete: () => revBanner.destroy()
        });
    }

    reachGoal() {
        if (this.isLevelOver) return;
        this.isLevelOver = true;

        this.player.setVelocity(0, 0);
        this.player.body.enable = false;

        if (window.SoundEffects) window.SoundEffects.playVictory();

        // Mushak celebration hop
        this.tweens.add({
            targets: this.player,
            y: this.player.y - 40,
            duration: 300,
            yoyo: true,
            repeat: 2
        });

        // Confetti / sparkle explosion around Pandal
        for (let i = 0; i < 24; i++) {
            const star = this.add.text(
                this.goal.x + (Math.random() * 200 - 100),
                this.goal.y + (Math.random() * 120 - 60),
                ['✨', '🎉', '🕉️', '🌸', '🟡'][Math.floor(Math.random() * 5)],
                { fontSize: '24px' }
            );
            this.tweens.add({
                targets: star,
                y: star.y - 120 - Math.random() * 80,
                x: star.x + (Math.random() * 120 - 60),
                alpha: 0,
                duration: 1200 + Math.random() * 400,
                ease: 'Quad.easeOut',
                onComplete: () => star.destroy()
            });
        }

        this.cameras.main.fade(1400, 255, 240, 200);
        this.time.delayedCall(1500, () => {
            this.scene.start('LevelCompleteScene', {
                score: this.score,
                modakCount: this.modakCount,
                ganeshaCoinCount: this.ganeshaCoinCount || 0,
                cheeseCount: this.cheeseCount,
                stompedCats: this.stompedCats,
                levelId: this.levelId
            });
        });
    }

    triggerGameOver() {
        this.isLevelOver = true;
        this.player.setVelocity(0, 0);
        this.player.body.enable = false;

        if (window.SoundEffects) window.SoundEffects.playGameOver();

        this.tweens.add({
            targets: this.player,
            y: this.player.y - 50,
            rotation: 1.5,
            duration: 400,
            yoyo: true,
            ease: 'Sine.easeOut'
        });

        this.cameras.main.fade(900, 0, 0, 0);
        this.time.delayedCall(1000, () => {
            this.scene.start('GameOverScene', {
                score: this.score,
                levelId: this.levelId
            });
        });
    }

    showFloatingText(x, y, text, color) {
        const floatText = this.add.text(x, y, text, {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '18px',
            fontStyle: 'bold',
            color: color || '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        this.tweens.add({
            targets: floatText,
            y: y - 36,
            alpha: 0,
            duration: 750,
            ease: 'Quad.easeOut',
            onComplete: () => floatText.destroy()
        });
    }
}


// --- 4. LEVEL COMPLETE SCENE ---
class LevelCompleteScene extends Phaser.Scene {
    constructor() {
        super('LevelCompleteScene');
    }

    init(data) {
        this.summaryData = data || {
            score: 0,
            modakCount: 0,
            cheeseCount: 0,
            stompedCats: 0,
            levelId: 'level1'
        };
    }

    create() {
        const width = 1280;
        const height = 720;

        const bg = this.add.image(width / 2, height / 2, 'background');
        bg.setDisplaySize(width, height);
        bg.setTint(0x553322);

        const overlay = this.add.graphics();
        overlay.fillGradientStyle(0x3e0000, 0x3e0000, 0x000000, 0x000000, 0.82);
        overlay.fillRect(0, 0, width, height);

        const nextLevelMap = {
            'level1': 'level2',
            'level2': 'level3',
            'level3': 'level4',
            'level4': 'level5'
        };
        const nextLevelId = nextLevelMap[this.summaryData.levelId];
        const isFinale = (this.summaryData.levelId === 'level5');
        const isRageRound = (this.summaryData.levelId === 'level6');

        let headerTitle = `🚩 विजय! ${this.summaryData.levelId.toUpperCase()} COMPLETE! 🚩`;
        let subTitle = 'Ganpati Bappa Morya! Mushak reached the holy Pandal!';
        if (isFinale) {
            headerTitle = '🚩 महोत्सव विजय! GAME COMPLETE! 🚩';
            subTitle = 'Mushak has completed the pilgrimage across all 5 festival neighborhoods!';
        } else if (isRageRound) {
            headerTitle = '💀 महोत्सव विजय! RAGE ROUND SURVIVED! 💀';
            subTitle = 'Unbelievable! You conquered the reversed festival gauntlet!';
        }

        this.add.text(width / 2, 70, headerTitle, {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '24px',
            fontStyle: 'bold',
            color: isRageRound ? '#FF5252' : '#FFCA28'
        }).setOrigin(0.5);

        this.add.text(width / 2, 140, 'गणपती बाप्पा मोरया!', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '56px',
            fontStyle: 'bold',
            color: '#FFF59D',
            stroke: '#B71C1C',
            strokeThickness: 8,
            shadow: { offsetX: 3, offsetY: 4, color: '#000000', blur: 6, fill: true }
        }).setOrigin(0.5);

        this.add.text(width / 2, 205, subTitle, {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '22px',
            color: isRageRound ? '#FFAB91' : '#FFE082'
        }).setOrigin(0.5);

        const card = this.add.graphics();
        card.fillStyle(0x1a0f08, 0.85);
        card.fillRoundedRect(width / 2 - 300, 245, 600, 260, 20);
        card.lineStyle(3, 0xFFB300, 1);
        card.strokeRoundedRect(width / 2 - 300, 245, 600, 260, 20);

        const modakScore = this.summaryData.modakCount * 10;
        const coinCount = this.summaryData.ganeshaCoinCount || 0;
        const coinScore = coinCount * 25;
        const cheeseScore = this.summaryData.cheeseCount * 5;
        const stompScore = this.summaryData.stompedCats * 20;

        const statRows = [
            { label: 'Modaks Collected:', val: `${this.summaryData.modakCount}  (+${modakScore} pts)` },
            { label: '🪙 Ganesha Coins:', val: `${coinCount}  (+${coinScore} pts)` },
            { label: 'Cheeses Eaten:', val: `${this.summaryData.cheeseCount}  (+${cheeseScore} pts)` },
            { label: 'Cats Cleared:', val: `${this.summaryData.stompedCats}  (+${stompScore} pts)` }
        ];

        statRows.forEach((row, i) => {
            this.add.text(width / 2 - 240, 270 + (i * 36), row.label, {
                fontFamily: 'Segoe UI, sans-serif',
                fontSize: '18px',
                color: '#E0E0E0'
            });
            this.add.text(width / 2 + 240, 270 + (i * 36), row.val, {
                fontFamily: 'Segoe UI, sans-serif',
                fontSize: '18px',
                fontStyle: 'bold',
                color: '#FFD54F'
            }).setOrigin(1, 0);
        });

        const divLine = this.add.graphics();
        divLine.lineStyle(2, 0xFFB300, 0.5);
        divLine.lineBetween(width / 2 - 240, 420, width / 2 + 240, 420);

        this.add.text(width / 2 - 240, 445, 'TOTAL SCORE:', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '26px',
            fontStyle: 'bold',
            color: '#FFFFFF'
        });
        this.add.text(width / 2 + 240, 445, `${this.summaryData.score} PTS`, {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '28px',
            fontStyle: 'bold',
            color: '#76FF03'
        }).setOrigin(1, 0);

        // NEXT LEVEL / CELEBRATE BUTTON
        const nextBtn = this.add.container(width / 2, 560);
        const btnBg = this.add.graphics();
        const btnColor = isRageRound ? 0xB71C1C : (isFinale ? 0xE65100 : 0x2E7D32);
        const btnStroke = isRageRound ? 0xFF8A80 : (isFinale ? 0xFFD54F : 0xA5D6A7);
        btnBg.fillStyle(btnColor, 1);
        btnBg.fillRoundedRect(-140, -28, 280, 56, 28);
        btnBg.lineStyle(3, btnStroke, 1);
        btnBg.strokeRoundedRect(-140, -28, 280, 56, 28);

        const btnLabel = isRageRound ? '★ RETURN TO LEVELS' : (isFinale ? '★ CELEBRATE / REPLAY' : 'NEXT LEVEL ❯');
        const btnText = this.add.text(0, 0, btnLabel, {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '21px',
            fontStyle: 'bold',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        nextBtn.add([btnBg, btnText]);
        nextBtn.setSize(280, 56);
        nextBtn.setInteractive({ useHandCursor: true });

        nextBtn.on('pointerover', () => {
            nextBtn.setScale(1.06);
        });
        nextBtn.on('pointerout', () => {
            nextBtn.setScale(1.0);
        });
        nextBtn.on('pointerdown', () => {
            if (window.SoundEffects) window.SoundEffects.playJump();
            if (nextLevelId) {
                this.scene.start('LevelScene', { levelId: nextLevelId });
            } else {
                this.scene.start('LevelSelectScene');
            }
        });

        // Bottom Navigation Links (Select Level & Main Menu)
        const levelsBtn = this.add.text(width / 2 - 120, 640, '🗺️ Choose Level', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '18px',
            fontStyle: 'bold',
            color: '#FFD54F'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        levelsBtn.on('pointerover', () => levelsBtn.setColor('#FFFFFF'));
        levelsBtn.on('pointerout', () => levelsBtn.setColor('#FFD54F'));
        levelsBtn.on('pointerdown', () => this.scene.start('LevelSelectScene'));

        const menuBtn = this.add.text(width / 2 + 120, 640, '⌂ Main Menu', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '18px',
            fontStyle: 'bold',
            color: '#FFB300'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        menuBtn.on('pointerover', () => menuBtn.setColor('#FFFFFF'));
        menuBtn.on('pointerout', () => menuBtn.setColor('#FFB300'));
        menuBtn.on('pointerdown', () => this.scene.start('MenuScene'));
    }
}


// --- 5. GAME OVER SCENE ---
class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        this.levelId = data && data.levelId ? data.levelId : 'level1';
        this.score = data && data.score ? data.score : 0;
    }

    create() {
        const width = 1280;
        const height = 720;

        const bg = this.add.image(width / 2, height / 2, 'background');
        bg.setDisplaySize(width, height);
        bg.setTint(0x331111);

        const overlay = this.add.graphics();
        overlay.fillGradientStyle(0x330000, 0x330000, 0x050000, 0x050000, 0.88);
        overlay.fillRect(0, 0, width, height);

        this.add.text(width / 2, 180, 'GAME OVER', {
            fontFamily: 'Trebuchet MS, Impact, sans-serif',
            fontSize: '70px',
            fontStyle: '900',
            color: '#FF5252',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(width / 2, 260, 'Mushak fell before reaching the holy Pandal!', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '22px',
            color: '#FFCDD2'
        }).setOrigin(0.5);

        this.add.text(width / 2, 330, `Score Accumulated: ${this.score} PTS`, {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '26px',
            fontStyle: 'bold',
            color: '#FFD54F'
        }).setOrigin(0.5);

        // RETRY BUTTON
        const retryBtn = this.add.container(width / 2, 440);
        const btnBg = this.add.graphics();
        btnBg.fillStyle(0xD32F2F, 1);
        btnBg.fillRoundedRect(-140, -30, 280, 60, 30);
        btnBg.lineStyle(3, 0xFF8A80, 1);
        btnBg.strokeRoundedRect(-140, -30, 280, 60, 30);

        const btnText = this.add.text(0, 0, '↺ RETRY LEVEL', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '24px',
            fontStyle: 'bold',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        retryBtn.add([btnBg, btnText]);
        retryBtn.setSize(280, 60);
        retryBtn.setInteractive({ useHandCursor: true });

        retryBtn.on('pointerover', () => {
            retryBtn.setScale(1.06);
            btnBg.clear();
            btnBg.fillStyle(0xF44336, 1);
            btnBg.fillRoundedRect(-140, -30, 280, 60, 30);
            btnBg.lineStyle(3, 0xFFCDD2, 1);
            btnBg.strokeRoundedRect(-140, -30, 280, 60, 30);
        });

        retryBtn.on('pointerout', () => {
            retryBtn.setScale(1.0);
            btnBg.clear();
            btnBg.fillStyle(0xD32F2F, 1);
            btnBg.fillRoundedRect(-140, -30, 280, 60, 30);
            btnBg.lineStyle(3, 0xFF8A80, 1);
            btnBg.strokeRoundedRect(-140, -30, 280, 60, 30);
        });

        retryBtn.on('pointerdown', () => {
            if (window.SoundEffects) window.SoundEffects.playJump();
            this.scene.start('LevelScene', { levelId: this.levelId });
        });

        // Bottom Navigation Links (Select Level + Return to Main Menu)
        const levelsBtn = this.add.text(width / 2 - 120, 530, '🗺️ Choose Level', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '18px',
            fontStyle: 'bold',
            color: '#FFD54F'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        levelsBtn.on('pointerover', () => levelsBtn.setColor('#FFFFFF'));
        levelsBtn.on('pointerout', () => levelsBtn.setColor('#FFD54F'));
        levelsBtn.on('pointerdown', () => this.scene.start('LevelSelectScene'));

        const menuBtn = this.add.text(width / 2 + 120, 530, '⌂ Main Menu', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '18px',
            fontStyle: 'bold',
            color: '#FFA000'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        menuBtn.on('pointerover', () => menuBtn.setColor('#FFFFFF'));
        menuBtn.on('pointerout', () => menuBtn.setColor('#FFA000'));
        menuBtn.on('pointerdown', () => this.scene.start('MenuScene'));
    }
}


// --- 5.5. SKY DASH SCENE (FLAPPY BIRD BONUS MODE) ---
class SkyDashScene extends Phaser.Scene {
    constructor() {
        super('SkyDashScene');
    }

    create() {
        const width = 1280;
        const height = 720;

        this.score = 0;
        this.bestScore = parseInt(localStorage.getItem('mushik_skydash_best') || '0', 10);
        this.gameState = 'READY'; // 'READY', 'PLAYING', 'GAMEOVER'
        this.obstacles = [];
        this.spawnTimer = null;

        // Background: Scrolling festive sky (depth 0)
        this.bg = this.add.tileSprite(width / 2, height / 2, width, height, 'background');
        this.bg.setTint(0x7986CB);
        this.bg.setDepth(0);

        // Dark gradient overlay for visual contrast (depth 1)
        this.skyOverlay = this.add.graphics();
        this.skyOverlay.fillGradientStyle(0x050c26, 0x050c26, 0x000000, 0x000000, 0.45);
        this.skyOverlay.fillRect(0, 0, width, height);
        this.skyOverlay.setDepth(1);

        // Ground decorative strip / border (depth 20)
        this.ground = this.add.tileSprite(width / 2, height - 15, width, 30, 'platform');
        this.ground.setDepth(20);
        this.physics.add.existing(this.ground, true);

        // Obstacle physics group with strict zero gravity
        this.obstacleGroup = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.lastGapCenter = 350;

        // Player Plane: Mushak in Biplane (depth 30)
        this.plane = this.physics.add.sprite(240, 340, 'plane');
        this.plane.setDisplaySize(76, 76);
        this.plane.body.setSize(44, 30);
        this.plane.body.setOffset(16, 23);
        this.plane.body.setAllowGravity(false);
        this.plane.setDepth(30);

        // Hover bob tween for READY state
        this.readyTween = this.tweens.add({
            targets: this.plane,
            y: 320,
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Top HUD (depth 100)
        this.createHUD();

        // Ready Banner / Instructions (depth 50)
        this.createReadyPrompt();

        // Dedicated Mobile Flap Button (depth 120)
        this.createMobileFlapButton();

        // Controls
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        // Input listener (click or tap anywhere)
        this.input.on('pointerdown', (pointer) => {
            // Check if user clicked top-left Exit button
            if (pointer.x < 190 && pointer.y < 65) return;
            this.handleFlapInput();
        });

        // Collision with obstacle group
        this.physics.add.overlap(this.plane, this.obstacleGroup, () => {
            this.handleGameOver('obstacle');
        }, null, this);
    }

    createHUD() {
        const width = 1280;

        // Top-left Back to Levels button
        this.exitBtn = this.add.container(105, 40).setDepth(100);
        const exitBg = this.add.graphics();
        exitBg.fillStyle(0x1a0f2e, 0.88);
        exitBg.fillRoundedRect(-75, -18, 150, 36, 18);
        exitBg.lineStyle(2, 0xFFB300, 1);
        exitBg.strokeRoundedRect(-75, -18, 150, 36, 18);

        const exitTxt = this.add.text(0, 0, '← Levels', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '16px',
            fontStyle: 'bold',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        this.exitBtn.add([exitBg, exitTxt]);
        this.exitBtn.setSize(150, 36);
        this.exitBtn.setInteractive({ useHandCursor: true });
        this.exitBtn.on('pointerdown', () => {
            if (window.SoundEffects) window.SoundEffects.playJump();
            this.scene.start('LevelSelectScene');
        });

        // Current Score in Top Center (Large classic Flappy Bird counter)
        this.scoreText = this.add.text(width / 2, 45, '0', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '56px',
            fontStyle: '900',
            color: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 7,
            shadow: { offsetX: 2, offsetY: 3, color: '#000000', blur: 8, fill: true }
        }).setOrigin(0.5).setDepth(100);

        // Best Score in Top Right
        this.bestText = this.add.text(width - 130, 40, `👑 BEST: ${this.bestScore}`, {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '17px',
            fontStyle: 'bold',
            color: '#FFD54F',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: { x: 12, y: 6 }
        }).setOrigin(0.5).setDepth(100);
    }

    createMobileFlapButton() {
        // Dedicated on-screen tactile button for mobile touch devices
        const flapBtn = this.add.container(1170, 600).setDepth(120);

        const bg = this.add.graphics();
        bg.fillStyle(0x00838F, 0.85);
        bg.fillCircle(0, 0, 48);
        bg.lineStyle(3, 0x00E5FF, 1);
        bg.strokeCircle(0, 0, 48);

        const glow = this.add.graphics();
        glow.lineStyle(1.5, 0xFFFFFF, 0.4);
        glow.strokeCircle(0, 0, 44);

        const icon = this.add.text(0, -8, '▲', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '30px',
            fontStyle: 'bold',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        const label = this.add.text(0, 16, 'FLAP', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '14px',
            fontStyle: 'bold',
            color: '#E0F7FA'
        }).setOrigin(0.5);

        flapBtn.add([bg, glow, icon, label]);
        flapBtn.setSize(96, 96);
        flapBtn.setInteractive(new Phaser.Geom.Circle(0, 0, 48), Phaser.Geom.Circle.Contains);

        flapBtn.on('pointerdown', (pointer) => {
            flapBtn.setScale(0.92);
            this.handleFlapInput();
        });
        flapBtn.on('pointerup', () => flapBtn.setScale(1.0));
        flapBtn.on('pointerout', () => flapBtn.setScale(1.0));
    }

    createReadyPrompt() {
        const width = 1280;
        this.readyContainer = this.add.container(width / 2, 450).setDepth(50);

        const promptBox = this.add.graphics();
        promptBox.fillStyle(0x0a1128, 0.88);
        promptBox.fillRoundedRect(-220, -50, 440, 100, 20);
        promptBox.lineStyle(2, 0x00E5FF, 1);
        promptBox.strokeRoundedRect(-220, -50, 440, 100, 20);

        const promptTitle = this.add.text(0, -18, '✈️ TAP OR PRESS SPACE TO FLAP!', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '20px',
            fontStyle: 'bold',
            color: '#FFF275'
        }).setOrigin(0.5);

        const promptSub = this.add.text(0, 18, 'Fly through the warp pipe pillars!', {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '15px',
            color: '#E0F7FA'
        }).setOrigin(0.5);

        this.readyContainer.add([promptBox, promptTitle, promptSub]);

        this.tweens.add({
            targets: this.readyContainer,
            scale: 1.05,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    handleFlapInput() {
        if (this.gameState === 'READY') {
            this.startGame();
            this.flap();
        } else if (this.gameState === 'PLAYING') {
            this.flap();
        }
    }

    startGame() {
        if (this.gameState === 'PLAYING') return;
        this.gameState = 'PLAYING';

        // Remove ready prompt and ready tween
        if (this.readyTween) {
            this.readyTween.stop();
            this.readyTween = null;
        }
        if (this.readyContainer) {
            this.tweens.add({
                targets: this.readyContainer,
                alpha: 0,
                duration: 200,
                onComplete: () => {
                    if (this.readyContainer) this.readyContainer.destroy();
                }
            });
        }

        // Enable plane gravity
        this.plane.body.setAllowGravity(true);
        this.plane.body.setGravityY(950);

        // Spawn first obstacle pair IMMEDIATELY
        this.spawnObstaclePair();

        // Start repeating spawner timer for subsequent obstacles (1.9s interval)
        this.spawnTimer = this.time.addEvent({
            delay: 1900,
            callback: this.spawnObstaclePair,
            callbackScope: this,
            loop: true
        });
    }

    flap() {
        if (this.gameState !== 'PLAYING') return;

        // Discrete flap impulse
        this.plane.setVelocityY(-350);

        // Quick tilt nose up
        this.plane.setRotation(-0.4);

        if (window.SoundEffects) window.SoundEffects.playJump();
    }

    spawnObstaclePair() {
        if (this.gameState !== 'PLAYING') return;

        const spawnX = 1320;
        const gapHeight = 250; // Extra generous gap for smooth passage

        // Smooth gradual height transitions without steep deadends
        if (!this.lastGapCenter) {
            this.lastGapCenter = 350;
        }
        const minCenter = Math.max(210, this.lastGapCenter - 110);
        const maxCenter = Math.min(490, this.lastGapCenter + 110);
        const gapCenter = Phaser.Math.Between(minCenter, maxCenter);
        this.lastGapCenter = gapCenter;

        const gapTop = Math.round(gapCenter - gapHeight / 2);
        const gapBottom = Math.round(gapCenter + gapHeight / 2);

        const topHeight = Math.max(40, gapTop);
        const bottomHeight = Math.max(40, 720 - gapBottom);

        // Top Pillar: warp pipe flipped vertically hanging from ceiling
        const topPillar = this.physics.add.image(spawnX, topHeight / 2, 'warp_pipe');
        topPillar.setDisplaySize(72, topHeight);
        topPillar.setFlipY(true);
        topPillar.setDepth(15);
        this.obstacleGroup.add(topPillar);

        // Completely immune to gravity & frozen in vertical position
        topPillar.body.setSize(66, topHeight);
        topPillar.body.setImmovable(true);
        topPillar.body.setAllowGravity(false);
        topPillar.body.moves = false;

        // Bottom Pillar: warp pipe rising up from bottom
        const bottomPillar = this.physics.add.image(spawnX, gapBottom + bottomHeight / 2, 'warp_pipe');
        bottomPillar.setDisplaySize(72, bottomHeight);
        bottomPillar.setDepth(15);
        this.obstacleGroup.add(bottomPillar);

        // Completely immune to gravity & frozen in vertical position
        bottomPillar.body.setSize(66, bottomHeight);
        bottomPillar.body.setImmovable(true);
        bottomPillar.body.setAllowGravity(false);
        bottomPillar.body.moves = false;

        this.obstacles.push({
            top: topPillar,
            bottom: bottomPillar,
            x: spawnX,
            topY: topHeight / 2,
            bottomY: gapBottom + bottomHeight / 2,
            passed: false
        });
    }

    update(time, delta) {
        // Allow keyboard controls to trigger flap in BOTH READY and PLAYING states
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey) ||
            Phaser.Input.Keyboard.JustDown(this.upKey) ||
            Phaser.Input.Keyboard.JustDown(this.wKey)) {
            this.handleFlapInput();
        }

        if (this.gameState === 'PLAYING') {
            // Scroll background
            this.bg.tilePositionX += 1.8;
            this.ground.tilePositionX += 3.5;

            // Smooth pitch rotation based on vertical velocity
            const vy = this.plane.body.velocity.y;
            const targetRot = Phaser.Math.Clamp(vy * 0.0018, -0.42, 0.72);
            this.plane.rotation = Phaser.Math.Linear(this.plane.rotation, targetRot, 0.12);

            // Ceiling and Floor collision checks
            if (this.plane.y < 20 || this.plane.y > 690) {
                this.handleGameOver('bounds');
                return;
            }

            // Move all active obstacles synchronously every frame
            const moveDelta = 220 * (delta / 1000);
            for (let i = this.obstacles.length - 1; i >= 0; i--) {
                const obs = this.obstacles[i];
                obs.x -= moveDelta;
                obs.top.x = obs.x;
                obs.bottom.x = obs.x;

                // Lock Y position so it can NEVER drop or drift
                obs.top.y = obs.topY;
                obs.bottom.y = obs.bottomY;

                // Sync physics body positions exactly to the visual sprites
                if (obs.top.body) {
                    obs.top.body.position.x = obs.x - obs.top.body.halfWidth;
                    obs.top.body.position.y = obs.topY - obs.top.body.halfHeight;
                }
                if (obs.bottom.body) {
                    obs.bottom.body.position.x = obs.x - obs.bottom.body.halfWidth;
                    obs.bottom.body.position.y = obs.bottomY - obs.bottom.body.halfHeight;
                }

                // Check scoring: when plane's x passes obstacle's x
                if (!obs.passed && obs.x < this.plane.x) {
                    obs.passed = true;
                    this.score++;
                    this.scoreText.setText(this.score.toString());

                    this.tweens.add({
                        targets: this.scoreText,
                        scale: 1.35,
                        duration: 120,
                        yoyo: true
                    });

                    if (window.SoundEffects) window.SoundEffects.playModak();
                }

                // Clean up offscreen obstacles once fully past left edge
                if (obs.x < -100) {
                    obs.top.destroy();
                    obs.bottom.destroy();
                    this.obstacles.splice(i, 1);
                }
            }
        }
    }

    handleGameOver(cause) {
        if (this.gameState === 'GAMEOVER') return;
        this.gameState = 'GAMEOVER';

        // Stop spawner
        if (this.spawnTimer) {
            this.spawnTimer.remove();
            this.spawnTimer = null;
        }

        // Freeze plane
        this.plane.body.setAllowGravity(false);
        this.plane.setVelocity(0, 0);

        // Stop all moving obstacles
        this.obstacles.forEach(obs => {
            if (obs.top && obs.top.body) obs.top.body.setVelocityX(0);
            if (obs.bottom && obs.bottom.body) obs.bottom.body.setVelocityX(0);
        });

        // Spawn blast effect
        const blast = this.add.image(this.plane.x, this.plane.y, 'blast');
        blast.setDisplaySize(150, 150).setDepth(150);
        this.plane.setVisible(false);

        this.tweens.add({
            targets: blast,
            scale: 1.4,
            alpha: 0,
            duration: 450,
            ease: 'Cubic.easeOut',
            onComplete: () => blast.destroy()
        });

        // Sounds & camera shake
        if (window.SoundEffects) {
            window.SoundEffects.playBrickBreak();
            window.SoundEffects.playHurt();
        }
        this.cameras.main.shake(260, 0.015);

        // Best score update
        const prevBest = parseInt(localStorage.getItem('mushik_skydash_best') || '0', 10);
        const isNewRecord = this.score > prevBest;
        const finalBest = Math.max(this.score, prevBest);
        localStorage.setItem('mushik_skydash_best', finalBest.toString());

        // Show Game Over Modal after short pause
        this.time.delayedCall(450, () => {
            this.showGameOverModal(isNewRecord, finalBest);
        });
    }

    showGameOverModal(isNewRecord, finalBest) {
        const width = 1280;
        const height = 720;

        const modal = this.add.container(width / 2, height / 2).setDepth(200);

        // Dim backdrop
        const dimmer = this.add.graphics();
        dimmer.fillStyle(0x000000, 0.75);
        dimmer.fillRect(-width / 2, -height / 2, width, height);
        dimmer.setInteractive(new Phaser.Geom.Rectangle(-width / 2, -height / 2, width, height), Phaser.Geom.Rectangle.Contains);
        modal.add(dimmer);

        // Card Box
        const card = this.add.graphics();
        card.fillStyle(0x130722, 0.96);
        card.fillRoundedRect(-240, -180, 480, 360, 24);
        card.lineStyle(3, 0xFF5252, 1);
        card.strokeRoundedRect(-240, -180, 480, 360, 24);
        modal.add(card);

        // Header Title
        const title = this.add.text(0, -135, '💥 CRASH! GAME OVER 💥', {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '26px',
            fontStyle: '900',
            color: '#FF5252'
        }).setOrigin(0.5);
        modal.add(title);

        // Score display
        const scoreLabel = this.add.text(0, -75, `SCORE: ${this.score}`, {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '38px',
            fontStyle: 'bold',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        modal.add(scoreLabel);

        // Best score display
        const bestLabel = this.add.text(0, -20, isNewRecord ? `🏆 NEW RECORD: ${finalBest}! 🏆` : `👑 BEST SCORE: ${finalBest}`, {
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '20px',
            fontStyle: 'bold',
            color: isNewRecord ? '#00E676' : '#FFD54F'
        }).setOrigin(0.5);
        modal.add(bestLabel);

        // Retry Button
        const retryBtn = this.createModalButton(0, 45, 230, 46, '🔄 PLAY AGAIN', 0xFF5722, 0xFF7043, () => {
            if (window.SoundEffects) window.SoundEffects.playJump();
            modal.destroy();
            this.scene.restart();
        });
        modal.add(retryBtn);

        // Back to Levels Button
        const backBtn = this.createModalButton(0, 110, 230, 44, '← BACK TO LEVELS', 0x311B92, 0x4527A0, () => {
            if (window.SoundEffects) window.SoundEffects.playJump();
            modal.destroy();
            this.scene.start('LevelSelectScene');
        });
        modal.add(backBtn);
    }

    createModalButton(x, y, w, h, text, color1, color2, onClick) {
        const btn = this.add.container(x, y);
        const bg = this.add.graphics();
        bg.fillStyle(color1, 1);
        bg.fillRoundedRect(-w / 2, -h / 2, w, h, h / 2);
        bg.lineStyle(2, 0xFFD54F, 1);
        bg.strokeRoundedRect(-w / 2, -h / 2, w, h, h / 2);

        const txt = this.add.text(0, 0, text, {
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '17px',
            fontStyle: 'bold',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        btn.add([bg, txt]);
        btn.setSize(w, h);
        btn.setInteractive({ useHandCursor: true });

        btn.on('pointerover', () => {
            btn.setScale(1.05);
            bg.clear();
            bg.fillStyle(color2, 1);
            bg.fillRoundedRect(-w / 2, -h / 2, w, h, h / 2);
            bg.lineStyle(2, 0xFFEB3B, 1);
            bg.strokeRoundedRect(-w / 2, -h / 2, w, h, h / 2);
        });
        btn.on('pointerout', () => {
            btn.setScale(1.0);
            bg.clear();
            bg.fillStyle(color1, 1);
            bg.fillRoundedRect(-w / 2, -h / 2, w, h, h / 2);
            bg.lineStyle(2, 0xFFD54F, 1);
            bg.strokeRoundedRect(-w / 2, -h / 2, w, h, h / 2);
        });
        btn.on('pointerdown', onClick);
        return btn;
    }
}


// --- 6. PHASER GAME CONFIGURATION ---
const gameConfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1280,
    height: 720,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    input: {
        keyboard: {
            target: window
        },
        activePointers: 4,
        touch: {
            capture: true
        }
    },
    scene: [
        PreloadScene,
        MenuScene,
        LevelSelectScene,
        LevelScene,
        LevelCompleteScene,
        GameOverScene,
        SkyDashScene
    ]
};

// Initialize game on window load and ensure responsive sizing
window.addEventListener('load', () => {
    window.game = new Phaser.Game(gameConfig);
    window.focus();

    // Attempt to lock screen orientation to landscape if supported by browser/device
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {});
    }
});
window.addEventListener('click', () => {
    window.focus();
});

// Dynamic responsive scaling for browser window resize & mobile orientation changes
window.addEventListener('resize', () => {
    if (window.game && window.game.scale) {
        window.game.scale.refresh();
    }
});
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        if (window.game && window.game.scale) {
            window.game.scale.refresh();
        }
    }, 200);
});

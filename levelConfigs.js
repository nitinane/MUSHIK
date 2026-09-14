// Modak Run - Data-Driven Level Configurations (Levels 1 to 6)
// Architecture drives distinct gameplay purely through level geometry, obstacles, tunnels & pacing.

window.LevelConfigs = {
    // --- LEVEL 1: GALLI / LANE ---
    // Extended runway (~6600px), gentle platforming, jump-timed gaps, 1 cheese block, 5 cats
    level1: {
        id: 'level1',
        number: 1,
        title: 'Level 1: Galli / Lane',
        subtitle: 'The Festival Alleyway',
        difficulty: 'Easy',
        stars: 1,
        worldWidth: 6600,
        worldHeight: 720,
        groundY: 640,
        groundHeight: 80,
        playerStart: { x: 140, y: 590 },
        bgTint: null, // Baseline warm festival lighting

        // Ground platform segments with jump-timed gaps
        groundSegments: [
            { startX: 0, endX: 1100 },       // Starting runway
            // Gap 1: 1100 to 1270 (170px)
            { startX: 1270, endX: 2200 },     // Mid segment 1
            // Gap 2: 2200 to 2390 (190px)
            { startX: 2390, endX: 3300 },     // Mid segment 2
            // Gap 3: 3300 to 3490 (190px)
            { startX: 3490, endX: 4500 },     // Extended segment 3
            // Gap 4: 4500 to 4700 (200px)
            { startX: 4700, endX: 5600 },     // Extended segment 4
            // Gap 5: 5600 to 5800 (200px)
            { startX: 5800, endX: 6600 }      // Final stretch to Ganesh Pandal
        ],

        // Floating decorative platform ledges
        floatingPlatforms: [
            { x: 1185, y: 560, width: 90, height: 24 },   // Step ledge above Gap 1
            { x: 2295, y: 560, width: 90, height: 24 },   // Step ledge above Gap 2
            { x: 3000, y: 540, width: 120, height: 24 },  // Rooftop ledge before Gap 3
            { x: 3395, y: 550, width: 90, height: 24 },   // Step ledge above Gap 3
            { x: 4100, y: 520, width: 110, height: 24 },  // High alleyway hop
            { x: 4600, y: 550, width: 95, height: 24 },   // Step ledge above Gap 4
            { x: 5200, y: 530, width: 110, height: 24 },  // Midway perch
            { x: 5700, y: 550, width: 90, height: 24 }    // Step ledge above Gap 5
        ],

        // Solid & breakable brick obstacles (36x36)
        solidBricks: [
            { x: 404, y: 490 },
            { x: 476, y: 490 },
            // Step 1 before Cat 1
            { x: 620, y: 630 },
            { x: 656, y: 630 },
            { x: 656, y: 594 },
            // Flanking Question Block 2
            { x: 1504, y: 490 },
            { x: 1576, y: 490 },
            // Block before Warp Pipe
            { x: 1800, y: 630 },
            // Stepping staircase near Gap 2
            { x: 2600, y: 630 },
            { x: 2636, y: 630 },
            { x: 2636, y: 594 },
            { x: 2672, y: 630 },
            { x: 2672, y: 594 },
            { x: 2672, y: 558 },
            // Extension bricks
            { x: 3750, y: 630 },
            { x: 3786, y: 630 },
            { x: 3786, y: 594 },
            { x: 4900, y: 630 },
            { x: 4936, y: 630 },
            { x: 4972, y: 630 },
            { x: 4972, y: 594 },
            { x: 6050, y: 630 }
        ],

        // Question mark blocks: strictly 1 cheese block per level (dropsCheese: true)
        questionBricks: [
            { x: 440, y: 490, dropsCheese: true },  // Sole cheese block in level 1
            { x: 1540, y: 490, dropsCheese: false },
            { x: 2480, y: 480, dropsCheese: false },
            { x: 3950, y: 490, dropsCheese: false },
            { x: 5350, y: 490, dropsCheese: false }
        ],

        // Warp Pipe jump-over obstacle (flush on ground)
        warpPipes: [
            { id: 'p1_1', x: 1950, y: 603, width: 70, height: 90, isWarp: false },
            { id: 'p1_2', x: 4300, y: 603, width: 70, height: 90, isWarp: false }
        ],

        // 5 Patrolling Cats
        enemies: [
            { x: 860, y: 616, minX: 740, maxX: 1040, speed: 75 },
            { x: 1660, y: 616, minX: 1420, maxX: 1780, speed: 85 },
            { x: 2880, y: 616, minX: 2780, maxX: 3180, speed: 90 },
            { x: 3900, y: 616, minX: 3650, maxX: 4100, speed: 85 },
            { x: 5100, y: 616, minX: 4850, maxX: 5400, speed: 90 }
        ],

        collectibles: [
            { x: 280, y: 590, type: 'modak' },
            { x: 340, y: 560, type: 'modak' },
            { x: 400, y: 590, type: 'modak' },
            { x: 656, y: 530, type: 'modak' },
            { x: 1140, y: 550, type: 'modak' },
            { x: 1185, y: 510, type: 'modak' },
            { x: 1230, y: 550, type: 'modak' },
            { x: 1420, y: 590, type: 'modak' },
            { x: 1480, y: 590, type: 'modak' },
            { x: 1600, y: 440, type: 'modak' },
            { x: 1950, y: 480, type: 'modak' },
            { x: 2240, y: 550, type: 'modak' },
            { x: 2295, y: 500, type: 'modak' },
            { x: 2350, y: 550, type: 'modak' },
            { x: 2636, y: 530, type: 'modak' },
            { x: 2672, y: 490, type: 'modak' },
            { x: 2980, y: 490, type: 'modak' },
            { x: 3040, y: 490, type: 'modak' },
            { x: 3395, y: 490, type: 'modak' },
            { x: 3600, y: 590, type: 'modak' },
            { x: 4100, y: 460, type: 'modak' },
            { x: 4300, y: 480, type: 'modak' },
            { x: 4600, y: 490, type: 'modak' },
            { x: 5200, y: 470, type: 'modak' },
            { x: 5700, y: 490, type: 'modak' },
            { x: 6150, y: 590, type: 'modak' },
            { x: 6250, y: 590, type: 'modak' },
            { x: 6350, y: 590, type: 'modak' }
        ],

        goal: {
            x: 6350,
            y: 533,
            width: 280,
            height: 220
        }
    },

    // --- LEVEL 2: MARKET STREET ---
    // Extended runway (~7000px), bazaar crates, warm golden tint, 6 cats
    level2: {
        id: 'level2',
        number: 2,
        title: 'Level 2: Market Street',
        subtitle: 'The Bustling Bazaar',
        difficulty: 'Medium',
        stars: 2,
        worldWidth: 7000,
        worldHeight: 720,
        groundY: 640,
        groundHeight: 80,
        playerStart: { x: 140, y: 590 },
        bgTint: 0xffe0b2, // Warm golden afternoon market lighting

        groundSegments: [
            { startX: 0, endX: 900 },         // Runway 1
            // Gap 1: 900 to 1080 (180px)
            { startX: 1080, endX: 1850 },     // Market Section 1
            // Gap 2: 1850 to 2040 (190px)
            { startX: 2040, endX: 2850 },     // Bazaar Center
            // Gap 3: 2850 to 3050 (200px)
            { startX: 3050, endX: 3850 },     // Stall Row
            // Gap 4: 3850 to 4040 (190px)
            { startX: 4040, endX: 4900 },     // Spice Market
            // Gap 5: 4900 to 5100 (200px)
            { startX: 5100, endX: 5950 },     // Sweets Lane
            // Gap 6: 5950 to 6140 (190px)
            { startX: 6140, endX: 7000 }      // Pandal Approach
        ],

        floatingPlatforms: [
            { x: 990, y: 550, width: 90, height: 24 },
            { x: 1450, y: 520, width: 110, height: 24 },
            { x: 1945, y: 540, width: 90, height: 24 },
            { x: 2950, y: 530, width: 100, height: 24 },
            { x: 3945, y: 540, width: 90, height: 24 },
            { x: 4450, y: 510, width: 110, height: 24 },
            { x: 5020, y: 540, width: 95, height: 24 },
            { x: 5500, y: 520, width: 110, height: 24 },
            { x: 6045, y: 540, width: 90, height: 24 }
        ],

        solidBricks: [
            { x: 420, y: 490 },
            { x: 492, y: 490 },
            // Stepped market crates
            { x: 1300, y: 630 },
            { x: 1336, y: 630 },
            { x: 1336, y: 594 },
            { x: 1372, y: 630 },
            { x: 1372, y: 594 },
            { x: 1372, y: 558 },
            // High bridge over market center
            { x: 2320, y: 480 },
            { x: 2356, y: 480 },
            { x: 2428, y: 480 },
            { x: 2464, y: 480 },
            // Step down staircase
            { x: 3400, y: 558 },
            { x: 3436, y: 594 },
            { x: 3472, y: 630 },
            // Extended bazaar crates
            { x: 4300, y: 630 },
            { x: 4336, y: 630 },
            { x: 4336, y: 594 },
            { x: 5350, y: 630 },
            { x: 5386, y: 630 },
            { x: 5386, y: 594 },
            { x: 5386, y: 558 }
        ],

        // Sole cheese block in level 2 (dropsCheese: true)
        questionBricks: [
            { x: 456, y: 490, dropsCheese: true },  // Sole cheese mystery in level 2
            { x: 1450, y: 320, dropsCheese: false },
            { x: 2392, y: 480, dropsCheese: false },
            { x: 3600, y: 490, dropsCheese: false },
            { x: 4650, y: 480, dropsCheese: false },
            { x: 5650, y: 490, dropsCheese: false }
        ],

        warpPipes: [
            { id: 'p2_1', x: 1720, y: 603, width: 70, height: 90, isWarp: false },
            { id: 'p2_2', x: 3700, y: 603, width: 70, height: 90, isWarp: false },
            { id: 'p2_3', x: 5750, y: 603, width: 70, height: 90, isWarp: false }
        ],

        // 6 Patrolling Cats
        enemies: [
            { x: 720, y: 616, minX: 580, maxX: 850, speed: 85 },
            { x: 1550, y: 616, minX: 1400, maxX: 1680, speed: 95 },
            { x: 2500, y: 616, minX: 2360, maxX: 2700, speed: 100 },
            { x: 3450, y: 616, minX: 3260, maxX: 3650, speed: 90 },
            { x: 4450, y: 616, minX: 4200, maxX: 4700, speed: 95 },
            { x: 5450, y: 616, minX: 5250, maxX: 5700, speed: 100 }
        ],

        collectibles: [
            { x: 260, y: 590, type: 'modak' },
            { x: 320, y: 560, type: 'modak' },
            { x: 380, y: 590, type: 'modak' },
            { x: 990, y: 500, type: 'modak' },
            { x: 1372, y: 510, type: 'modak' },
            { x: 1450, y: 470, type: 'modak' },
            { x: 1720, y: 480, type: 'modak' },
            { x: 1945, y: 490, type: 'modak' },
            { x: 2150, y: 590, type: 'modak' },
            { x: 2320, y: 430, type: 'modak' },
            { x: 2464, y: 430, type: 'modak' },
            { x: 2950, y: 480, type: 'modak' },
            { x: 3250, y: 590, type: 'modak' },
            { x: 3700, y: 480, type: 'modak' },
            { x: 3945, y: 490, type: 'modak' },
            { x: 4450, y: 450, type: 'modak' },
            { x: 5020, y: 490, type: 'modak' },
            { x: 5500, y: 460, type: 'modak' },
            { x: 5750, y: 480, type: 'modak' },
            { x: 6045, y: 490, type: 'modak' },
            { x: 6400, y: 590, type: 'modak' },
            { x: 6500, y: 590, type: 'modak' },
            { x: 6600, y: 590, type: 'modak' }
        ],

        goal: {
            x: 6750,
            y: 533,
            width: 280,
            height: 220
        }
    },

    // --- LEVEL 3: ROOFTOP HOP ---
    // Extended runway (~7500px), sunset crimson tint, linked warp pipe shortcut tunnel!
    level3: {
        id: 'level3',
        number: 3,
        title: 'Level 3: Rooftop Hop',
        subtitle: 'Above the Festive City',
        difficulty: 'Hard',
        stars: 3,
        worldWidth: 7500,
        worldHeight: 720,
        groundY: 640,
        groundHeight: 80,
        playerStart: { x: 140, y: 590 },
        bgTint: 0xffccbc, // Sunset crimson/amber rooftop tint

        groundSegments: [
            { startX: 0, endX: 800 },
            // Gap 1: 800 to 1020 (220px)
            { startX: 1020, endX: 1650 },
            // Gap 2: 1650 to 1900 (250px)
            { startX: 1900, endX: 2700 },
            // Gap 3: 2700 to 2950 (250px)
            { startX: 2950, endX: 3800 },
            // Gap 4: 3800 to 4040 (240px)
            { startX: 4040, endX: 4900 },
            // Gap 5: 4900 to 5150 (250px)
            { startX: 5150, endX: 6100 },
            // Gap 6: 6100 to 6340 (240px)
            { startX: 6340, endX: 7500 }
        ],

        floatingPlatforms: [
            { x: 910, y: 540, width: 100, height: 24 },
            { x: 1300, y: 490, width: 120, height: 24 },  // High rooftop 1
            { x: 1730, y: 540, width: 80, height: 24 },
            { x: 1820, y: 510, width: 80, height: 24 },
            { x: 2250, y: 470, width: 130, height: 24 },  // High rooftop 2
            { x: 2825, y: 530, width: 110, height: 24 },
            { x: 3350, y: 480, width: 120, height: 24 },  // High rooftop 3
            { x: 3920, y: 540, width: 90, height: 24 },
            { x: 4450, y: 480, width: 120, height: 24 },  // High rooftop 4
            { x: 5025, y: 530, width: 100, height: 24 },
            { x: 5600, y: 470, width: 130, height: 24 },  // High rooftop 5
            { x: 6220, y: 540, width: 90, height: 24 }
        ],

        solidBricks: [
            { x: 450, y: 480 },
            { x: 522, y: 480 },
            { x: 1480, y: 630 },
            { x: 1516, y: 630 },
            // High brick canopy over high rooftop
            { x: 2200, y: 310 },
            { x: 2272, y: 310 },
            // Steps before Gap 4
            { x: 3600, y: 630 },
            { x: 3636, y: 630 },
            { x: 3636, y: 594 },
            // Extended canopy
            { x: 4400, y: 310 },
            { x: 4472, y: 310 },
            { x: 5750, y: 630 },
            { x: 5786, y: 630 },
            { x: 5786, y: 594 }
        ],

        // Sole cheese block in level 3 (dropsCheese: true)
        questionBricks: [
            { x: 486, y: 480, dropsCheese: true }, // Sole cheese mystery in level 3
            { x: 1300, y: 320, dropsCheese: false },
            { x: 2236, y: 310, dropsCheese: false },
            { x: 3350, y: 320, dropsCheese: false },
            { x: 4436, y: 310, dropsCheese: false },
            { x: 5600, y: 310, dropsCheese: false }
        ],

        // Warp Pipes: includes a linked shortcut tunnel pair!
        warpPipes: [
            // Entry pipe 1 at x=2050 teleports to exit pipe 2 at x=3500!
            { id: 'p3_tunnel_in', x: 2050, y: 603, width: 70, height: 90, isWarp: true, targetX: 3500, targetY: 603, pairId: 'roof_tunnel', hint: 'Warp Shortcut' },
            { id: 'p3_tunnel_out', x: 3500, y: 603, width: 70, height: 90, isWarp: true, targetX: 2050, targetY: 603, pairId: 'roof_tunnel' },
            // Standard obstacle pipe
            { id: 'p3_3', x: 5400, y: 603, width: 70, height: 90, isWarp: false }
        ],

        // 6 Patrolling Cats
        enemies: [
            { x: 650, y: 616, minX: 520, maxX: 760, speed: 90 },
            { x: 1300, y: 466, minX: 1250, maxX: 1350, speed: 60 },
            { x: 2450, y: 616, minX: 2300, maxX: 2650, speed: 100 },
            { x: 3450, y: 616, minX: 3300, maxX: 3580, speed: 95 },
            { x: 4650, y: 616, minX: 4450, maxX: 4850, speed: 105 },
            { x: 5850, y: 616, minX: 5650, maxX: 6050, speed: 100 }
        ],

        collectibles: [
            { x: 240, y: 590, type: 'modak' },
            { x: 300, y: 560, type: 'modak' },
            { x: 910, y: 490, type: 'modak' },
            { x: 1250, y: 440, type: 'modak' },
            { x: 1350, y: 440, type: 'modak' },
            { x: 1730, y: 490, type: 'modak' },
            { x: 1820, y: 460, type: 'modak' },
            { x: 2050, y: 480, type: 'modak' },
            { x: 2200, y: 420, type: 'modak' },
            { x: 2272, y: 420, type: 'modak' },
            { x: 2825, y: 480, type: 'modak' },
            { x: 3350, y: 430, type: 'modak' },
            { x: 3500, y: 480, type: 'modak' },
            { x: 3920, y: 490, type: 'modak' },
            { x: 4450, y: 430, type: 'modak' },
            { x: 5025, y: 480, type: 'modak' },
            { x: 5400, y: 480, type: 'modak' },
            { x: 5600, y: 420, type: 'modak' },
            { x: 6220, y: 490, type: 'modak' },
            { x: 6800, y: 590, type: 'modak' },
            { x: 6950, y: 590, type: 'modak' },
            { x: 7100, y: 590, type: 'modak' }
        ],

        goal: {
            x: 7250,
            y: 533,
            width: 280,
            height: 220
        }
    },

    // --- LEVEL 4: PROCESSION ROAD ---
    // Extended runway (~8200px), twilight violet tint, 7 fast cats
    level4: {
        id: 'level4',
        number: 4,
        title: 'Level 4: Procession Road',
        subtitle: 'The Grand Shobha Yatra',
        difficulty: 'Expert',
        stars: 4,
        worldWidth: 8200,
        worldHeight: 720,
        groundY: 640,
        groundHeight: 80,
        playerStart: { x: 140, y: 590 },
        bgTint: 0xe1bee7, // Twilight violet/magenta festival lighting

        groundSegments: [
            { startX: 0, endX: 850 },
            // Gap 1: 850 to 1050 (200px)
            { startX: 1050, endX: 1800 },
            // Gap 2: 1800 to 2010 (210px)
            { startX: 2010, endX: 2800 },
            // Gap 3: 2800 to 3020 (220px)
            { startX: 3020, endX: 3850 },
            // Gap 4: 3850 to 4080 (230px)
            { startX: 4080, endX: 4950 },
            // Gap 5: 4950 to 5180 (230px)
            { startX: 5180, endX: 6050 },
            // Gap 6: 6050 to 6280 (230px)
            { startX: 6280, endX: 7150 },
            // Gap 7: 7150 to 7360 (210px)
            { startX: 7360, endX: 8200 }
        ],

        floatingPlatforms: [
            { x: 950, y: 550, width: 90, height: 24 },
            { x: 1400, y: 510, width: 100, height: 24 },
            { x: 1905, y: 540, width: 90, height: 24 },
            { x: 2400, y: 490, width: 110, height: 24 },
            { x: 2910, y: 530, width: 90, height: 24 },
            { x: 3450, y: 500, width: 100, height: 24 },
            { x: 3965, y: 540, width: 90, height: 24 },
            { x: 4500, y: 490, width: 110, height: 24 },
            { x: 5065, y: 540, width: 90, height: 24 },
            { x: 5600, y: 490, width: 110, height: 24 },
            { x: 6165, y: 540, width: 90, height: 24 },
            { x: 6700, y: 500, width: 110, height: 24 },
            { x: 7255, y: 540, width: 90, height: 24 }
        ],

        solidBricks: [
            { x: 420, y: 480 },
            { x: 492, y: 480 },
            // Road barricade 1
            { x: 1250, y: 630 },
            { x: 1250, y: 594 },
            // Staircase cluster
            { x: 2200, y: 630 },
            { x: 2236, y: 630 },
            { x: 2236, y: 594 },
            { x: 2272, y: 630 },
            { x: 2272, y: 594 },
            { x: 2272, y: 558 },
            // Upper bridge
            { x: 3250, y: 480 },
            { x: 3322, y: 480 },
            // Barricade 2
            { x: 4250, y: 630 },
            { x: 4250, y: 594 },
            // Barricade 3
            { x: 5400, y: 630 },
            { x: 5436, y: 630 },
            { x: 5436, y: 594 },
            // Upper bridge 2
            { x: 6500, y: 480 },
            { x: 6572, y: 480 }
        ],

        // Sole cheese block in level 4 (dropsCheese: true)
        questionBricks: [
            { x: 456, y: 480, dropsCheese: true }, // Sole cheese mystery in level 4
            { x: 1400, y: 330, dropsCheese: false },
            { x: 2400, y: 320, dropsCheese: false },
            { x: 3286, y: 480, dropsCheese: false },
            { x: 4500, y: 320, dropsCheese: false },
            { x: 5600, y: 320, dropsCheese: false },
            { x: 6536, y: 480, dropsCheese: false }
        ],

        warpPipes: [
            { id: 'p4_1', x: 1600, y: 603, width: 70, height: 90, isWarp: false },
            { id: 'p4_2', x: 3650, y: 603, width: 70, height: 90, isWarp: false },
            { id: 'p4_3', x: 5850, y: 603, width: 70, height: 90, isWarp: false }
        ],

        // 7 Fast Patrolling Cats
        enemies: [
            { x: 680, y: 616, minX: 520, maxX: 800, speed: 95 },
            { x: 1450, y: 616, minX: 1300, maxX: 1600, speed: 105 },
            { x: 2500, y: 616, minX: 2320, maxX: 2750, speed: 110 },
            { x: 3500, y: 616, minX: 3300, maxX: 3750, speed: 105 },
            { x: 4600, y: 616, minX: 4400, maxX: 4850, speed: 115 },
            { x: 5700, y: 616, minX: 5500, maxX: 5950, speed: 110 },
            { x: 6800, y: 616, minX: 6600, maxX: 7050, speed: 115 }
        ],

        collectibles: [
            { x: 260, y: 590, type: 'modak' },
            { x: 320, y: 560, type: 'modak' },
            { x: 950, y: 500, type: 'modak' },
            { x: 1250, y: 540, type: 'modak' },
            { x: 1400, y: 460, type: 'modak' },
            { x: 1600, y: 480, type: 'modak' },
            { x: 1905, y: 490, type: 'modak' },
            { x: 2272, y: 510, type: 'modak' },
            { x: 2400, y: 440, type: 'modak' },
            { x: 2910, y: 480, type: 'modak' },
            { x: 3250, y: 430, type: 'modak' },
            { x: 3322, y: 430, type: 'modak' },
            { x: 3450, y: 450, type: 'modak' },
            { x: 3650, y: 480, type: 'modak' },
            { x: 3965, y: 490, type: 'modak' },
            { x: 4500, y: 440, type: 'modak' },
            { x: 5065, y: 490, type: 'modak' },
            { x: 5600, y: 440, type: 'modak' },
            { x: 6165, y: 490, type: 'modak' },
            { x: 6700, y: 450, type: 'modak' },
            { x: 7255, y: 490, type: 'modak' },
            { x: 7700, y: 590, type: 'modak' },
            { x: 7850, y: 590, type: 'modak' }
        ],

        goal: {
            x: 7950,
            y: 533,
            width: 280,
            height: 220
        }
    },

    // --- LEVEL 5: THE PANDAL (FINALE) ---
    // Extended runway (~8600px), night celestial illumination, gauntlet jumps, 8 cats, grand finale
    level5: {
        id: 'level5',
        number: 5,
        title: 'Level 5: The Pandal (Finale)',
        subtitle: 'Lord Ganesha\'s Holy Sanctuary',
        difficulty: 'Master',
        stars: 5,
        worldWidth: 8600,
        worldHeight: 720,
        groundY: 640,
        groundHeight: 80,
        playerStart: { x: 140, y: 590 },
        bgTint: 0x80deea, // Cool celestial night lighting

        groundSegments: [
            { startX: 0, endX: 750 },
            // Gap 1: 750 to 970 (220px)
            { startX: 970, endX: 1650 },
            // Gap 2: 1650 to 1890 (240px)
            { startX: 1890, endX: 2600 },
            // Gap 3: 2600 to 2850 (250px)
            { startX: 2850, endX: 3600 },
            // Gap 4: 3600 to 3860 (260px)
            { startX: 3860, endX: 4650 },
            // Gap 5: 4650 to 4910 (260px)
            { startX: 4910, endX: 5750 },
            // Gap 6: 5750 to 6010 (260px)
            { startX: 6010, endX: 6850 },
            // Gap 7: 6850 to 7100 (250px)
            { startX: 7100, endX: 7750 },
            // Final Gauntlet Gap 8: 7750 to 7980 (230px)
            { startX: 7980, endX: 8600 }     // Holy pandal courtyard
        ],

        floatingPlatforms: [
            { x: 860, y: 540, width: 90, height: 24 },
            { x: 1300, y: 490, width: 110, height: 24 },
            { x: 1770, y: 540, width: 90, height: 24 },
            { x: 2250, y: 470, width: 120, height: 24 },
            { x: 2725, y: 530, width: 90, height: 24 },
            { x: 3200, y: 480, width: 110, height: 24 },
            { x: 3730, y: 530, width: 90, height: 24 },
            { x: 4250, y: 480, width: 110, height: 24 },
            { x: 4780, y: 530, width: 90, height: 24 },
            { x: 5300, y: 480, width: 110, height: 24 },
            { x: 5880, y: 530, width: 90, height: 24 },
            { x: 6400, y: 480, width: 110, height: 24 },
            { x: 6975, y: 530, width: 90, height: 24 },
            { x: 7450, y: 490, width: 110, height: 24 },
            { x: 7865, y: 540, width: 90, height: 24 }
        ],

        solidBricks: [
            { x: 380, y: 470 },
            { x: 452, y: 470 },
            // Sanctuary steps 1
            { x: 1150, y: 630 },
            { x: 1186, y: 630 },
            { x: 1186, y: 594 },
            // Floating brick canopy 1
            { x: 2200, y: 310 },
            { x: 2272, y: 310 },
            // Stepping pyramid
            { x: 3050, y: 630 },
            { x: 3086, y: 630 },
            { x: 3086, y: 594 },
            { x: 3122, y: 630 },
            // Canopy 2
            { x: 4200, y: 320 },
            { x: 4272, y: 320 },
            // Stepping pyramid 2
            { x: 5450, y: 630 },
            { x: 5486, y: 630 },
            { x: 5486, y: 594 },
            // Canopy 3
            { x: 6350, y: 320 },
            { x: 6422, y: 320 },
            // Final gauntlet guard block
            { x: 7600, y: 630 },
            { x: 7600, y: 594 }
        ],

        // Sole cheese block in level 5 (dropsCheese: true)
        questionBricks: [
            { x: 416, y: 470, dropsCheese: true }, // Sole cheese mystery in level 5
            { x: 1300, y: 320, dropsCheese: false },
            { x: 2236, y: 310, dropsCheese: false },
            { x: 3200, y: 320, dropsCheese: false },
            { x: 4236, y: 320, dropsCheese: false },
            { x: 5300, y: 320, dropsCheese: false },
            { x: 6386, y: 320, dropsCheese: false },
            { x: 7450, y: 320, dropsCheese: false }
        ],

        warpPipes: [
            { id: 'p5_1', x: 1500, y: 603, width: 70, height: 90, isWarp: false },
            { id: 'p5_2', x: 3450, y: 603, width: 70, height: 90, isWarp: false },
            { id: 'p5_3', x: 5600, y: 603, width: 70, height: 90, isWarp: false }
        ],

        // 8 Cats
        enemies: [
            { x: 600, y: 616, minX: 450, maxX: 700, speed: 100 },
            { x: 1200, y: 616, minX: 1050, maxX: 1450, speed: 110 },
            { x: 2050, y: 616, minX: 1950, maxX: 2300, speed: 115 },
            { x: 3000, y: 616, minX: 2900, maxX: 3250, speed: 110 },
            { x: 4050, y: 616, minX: 3950, maxX: 4350, speed: 120 },
            { x: 5100, y: 616, minX: 4980, maxX: 5400, speed: 115 },
            { x: 6200, y: 616, minX: 6080, maxX: 6500, speed: 120 },
            { x: 7300, y: 616, minX: 7150, maxX: 7550, speed: 125 }
        ],

        collectibles: [
            { x: 240, y: 590, type: 'modak' },
            { x: 300, y: 560, type: 'modak' },
            { x: 860, y: 490, type: 'modak' },
            { x: 1186, y: 540, type: 'modak' },
            { x: 1300, y: 440, type: 'modak' },
            { x: 1500, y: 480, type: 'modak' },
            { x: 1770, y: 490, type: 'modak' },
            { x: 2200, y: 420, type: 'modak' },
            { x: 2272, y: 420, type: 'modak' },
            { x: 2725, y: 480, type: 'modak' },
            { x: 3200, y: 430, type: 'modak' },
            { x: 3450, y: 480, type: 'modak' },
            { x: 3730, y: 480, type: 'modak' },
            { x: 4250, y: 430, type: 'modak' },
            { x: 4780, y: 480, type: 'modak' },
            { x: 5300, y: 430, type: 'modak' },
            { x: 5600, y: 480, type: 'modak' },
            { x: 5880, y: 480, type: 'modak' },
            { x: 6400, y: 430, type: 'modak' },
            { x: 6975, y: 480, type: 'modak' },
            { x: 7450, y: 440, type: 'modak' },
            { x: 7865, y: 490, type: 'modak' },
            { x: 8200, y: 590, type: 'modak' },
            { x: 8350, y: 590, type: 'modak' }
        ],

        goal: {
            x: 8350,
            y: 533,
            width: 280,
            height: 220
        }
    },

    // --- LEVEL 6: RAGE ROUND (BONUS CHALLENGE) ---
    // Inverted Left/Right controls! Fiery chaotic crimson tint, 8 lightning-fast cats,
    // mandatory warp tunnel skipping an impossible spiked gap!
    level6: {
        id: 'level6',
        number: 6,
        isBonus: true,
        reversedControls: true, // Inverts Left <-> Right controls!
        title: 'Level 6: Rage Round 💀',
        subtitle: 'Reversed Galli Chaos (Bonus Challenge)',
        difficulty: 'Nightmare',
        stars: 6,
        worldWidth: 7600,
        worldHeight: 720,
        groundY: 640,
        groundHeight: 80,
        playerStart: { x: 140, y: 590 },
        bgTint: 0xff3d00, // Fiery blaze / crimson inferno rage tint

        groundSegments: [
            { startX: 0, endX: 900 },
            // Gap 1: 900 to 1130 (230px)
            { startX: 1130, endX: 1950 },
            // Gap 2: 1950 to 2200 (250px)
            { startX: 2200, endX: 3000 },
            // GIANT IMPOSSIBLE PIT (3000 to 4400) - Must take Warp Tunnel at x=2850 to bypass!
            { startX: 4400, endX: 5300 },
            // Gap 3: 5300 to 5550 (250px)
            { startX: 5550, endX: 6400 },
            // Gap 4: 6400 to 6650 (250px)
            { startX: 6650, endX: 7600 }      // Final rage stretch
        ],

        floatingPlatforms: [
            { x: 1015, y: 540, width: 90, height: 24 },
            { x: 1550, y: 490, width: 110, height: 24 },
            { x: 2075, y: 530, width: 90, height: 24 },
            { x: 2600, y: 480, width: 110, height: 24 },
            // Floating platforms inside the bonus high air above the pit
            { x: 3300, y: 420, width: 100, height: 24 },
            { x: 3700, y: 420, width: 100, height: 24 },
            { x: 4100, y: 420, width: 100, height: 24 },
            // Approach platforms
            { x: 4850, y: 500, width: 110, height: 24 },
            { x: 5425, y: 530, width: 90, height: 24 },
            { x: 5950, y: 490, width: 110, height: 24 },
            { x: 6525, y: 530, width: 90, height: 24 },
            { x: 7050, y: 490, width: 110, height: 24 }
        ],

        solidBricks: [
            { x: 420, y: 480 },
            { x: 492, y: 480 },
            // Stash crates before tunnel
            { x: 2450, y: 630 },
            { x: 2486, y: 630 },
            { x: 2486, y: 594 },
            { x: 2522, y: 630 },
            { x: 2522, y: 594 },
            { x: 2522, y: 558 },
            // Danger blockades
            { x: 4700, y: 630 },
            { x: 4700, y: 594 },
            { x: 5800, y: 630 },
            { x: 5800, y: 594 },
            { x: 6850, y: 630 },
            { x: 6886, y: 630 },
            { x: 6886, y: 594 }
        ],

        // Strictly 1 cheese block in Level 6 (dropsCheese: true)
        questionBricks: [
            { x: 456, y: 480, dropsCheese: true },  // Sole cheese in rage round
            { x: 1550, y: 320, dropsCheese: false },
            { x: 2600, y: 320, dropsCheese: false },
            { x: 4850, y: 330, dropsCheese: false },
            { x: 5950, y: 320, dropsCheese: false }
        ],

        // Mandatory Warp Tunnel: Player enters at x=2850, emerges at x=4550 across the 1400px abyss!
        warpPipes: [
            { id: 'rage_in', x: 2850, y: 603, width: 70, height: 90, isWarp: true, targetX: 4550, targetY: 603, pairId: 'rage_bypass', hint: 'Abyss Bypass Tunnel' },
            { id: 'rage_out', x: 4550, y: 603, width: 70, height: 90, isWarp: true, targetX: 2850, targetY: 603, pairId: 'rage_bypass' }
        ],

        // 8 Ultra-fast Patrolling Cats
        enemies: [
            { x: 650, y: 616, minX: 500, maxX: 820, speed: 125 },
            { x: 1450, y: 616, minX: 1250, maxX: 1750, speed: 135 },
            { x: 2350, y: 616, minX: 2250, maxX: 2450, speed: 120 },
            { x: 4700, y: 616, minX: 4600, maxX: 5100, speed: 140 },
            { x: 5200, y: 616, minX: 5000, maxX: 5280, speed: 130 },
            { x: 5750, y: 616, minX: 5600, maxX: 6150, speed: 135 },
            { x: 6250, y: 616, minX: 6100, maxX: 6380, speed: 140 },
            { x: 7100, y: 616, minX: 6900, maxX: 7400, speed: 145 }
        ],

        collectibles: [
            { x: 250, y: 590, type: 'modak' },
            { x: 310, y: 560, type: 'modak' },
            { x: 1015, y: 490, type: 'modak' },
            { x: 1550, y: 440, type: 'modak' },
            { x: 2075, y: 480, type: 'modak' },
            { x: 2522, y: 510, type: 'modak' },
            { x: 2850, y: 480, type: 'modak' },
            // Secret mid-air modaks above the abyss
            { x: 3300, y: 370, type: 'modak' },
            { x: 3700, y: 370, type: 'modak' },
            { x: 4100, y: 370, type: 'modak' },
            { x: 4550, y: 480, type: 'modak' },
            { x: 4850, y: 450, type: 'modak' },
            { x: 5425, y: 480, type: 'modak' },
            { x: 5950, y: 440, type: 'modak' },
            { x: 6525, y: 480, type: 'modak' },
            { x: 7050, y: 440, type: 'modak' },
            { x: 7300, y: 590, type: 'modak' },
            { x: 7400, y: 590, type: 'modak' }
        ],

        goal: {
            x: 7350,
            y: 533,
            width: 280,
            height: 220
        }
    }
};

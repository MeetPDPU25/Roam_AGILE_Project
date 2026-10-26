// backend/seed.js — Rich data for 6 Rajasthan cities
const mongoose = require('mongoose');
require('dotenv').config();

const City     = require('./models/City');
const Place    = require('./models/Place');
const Food     = require('./models/Food');
const Shopping = require('./models/Shopping');
const Itinerary= require('./models/Itinerary');

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB for seeding...');

        // Drop all collections cleanly
        const dropIfExists = async (model) => {
            try { await model.collection.drop(); } catch (e) { /* ok */ }
        };
        await Promise.all([
            dropIfExists(City), dropIfExists(Place), dropIfExists(Food),
            dropIfExists(Shopping), dropIfExists(Itinerary),
        ]);
        console.log('🧹 Cleared all old data.');

        // ══════════════════════════════════════════
        // 1. CITIES
        // ══════════════════════════════════════════
        const citiesData = [
            {
                city_id: 'C01', city_name: 'Jaipur', name: 'The Pink City',
                description: 'Capital of Rajasthan and the first planned city of India. Jaipur dazzles visitors with its rose-pink architecture, magnificent forts, royal palaces, vibrant bazaars, and a rich cultural tapestry that blends Mughal and Rajput heritage.',
                best_time: 'October to March', air: 'Jaipur International Airport (Sanganer)',
                train: 'Jaipur Junction Railway Station', road: 'Well connected via NH48 & NH52',
                map_link: 'https://maps.app.goo.gl/jaipur', image_url: 'images/jaipur/hawaMahal.jpg'
            },
            {
                city_id: 'C02', city_name: 'Udaipur', name: 'City of Lakes',
                description: 'Nestled among the Aravalli hills, Udaipur is one of India\'s most romantic cities. Known as the Venice of the East, its shimmering lakes, ornate palaces, and colourful havelis make it an unforgettable destination.',
                best_time: 'September to March', air: 'Maharana Pratap Airport',
                train: 'Udaipur City Railway Station', road: 'Well connected via NH58 & NH76',
                map_link: 'https://maps.app.goo.gl/udaipur', image_url: 'images/udaipur/udaipur-cover.avif'
            },
            {
                city_id: 'C03', city_name: 'Jodhpur', name: 'The Blue City',
                description: 'Jodhpur, the Sun City, is famous for the colossal Mehrangarh Fort that towers over a sea of indigo-blue houses. A perfect blend of ancient Rajput glory, colourful markets, and the warm hospitality of the Marwar region.',
                best_time: 'October to February', air: 'Jodhpur Airport',
                train: 'Jodhpur Junction Railway Station', road: 'Well connected via NH62 & NH25',
                map_link: 'https://maps.app.goo.gl/jodhpur', image_url: 'images/jodhpur/jodhpur-cover.jpg'
            },
            {
                city_id: 'C04', city_name: 'Jaisalmer', name: 'The Golden City',
                description: 'Rising from the heart of the Thar Desert, Jaisalmer is a living fairy tale. Its golden sandstone fort — still inhabited — shimmers at sunset, while camel safaris and starlit desert camps make every visit magical.',
                best_time: 'November to February', air: 'Jaisalmer Airport',
                train: 'Jaisalmer Railway Station', road: 'Well connected via NH11',
                map_link: 'https://maps.app.goo.gl/jaisalmer', image_url: 'images/jaiselmer/jaiselmer-cover.jpg'
            },
            {
                city_id: 'C05', city_name: 'Bikaner', name: 'The Camel Country',
                description: 'Bikaner is a walled desert city known for its stunning Junagarh Fort, intricately carved havelis, the famous Karni Mata (Rat) Temple, and the world-renowned Bikaner Bhujiyas. A hidden gem of royal Rajasthan.',
                best_time: 'October to February', air: 'Nal Airport (Bikaner)',
                train: 'Bikaner Junction Railway Station', road: 'Well connected via NH11 & NH89',
                map_link: 'https://maps.app.goo.gl/bikaner', image_url: 'images/bikaner/bikaner-cover.jpg'
            },
            {
                city_id: 'C06', city_name: 'Kota', name: 'The Education City',
                description: 'Situated on the banks of the Chambal River, Kota is Rajasthan\'s industrial and educational hub. It also offers beautiful palaces, a wildlife sanctuary, and the spectacular Kota Barrage — a paradise for nature lovers and history buffs alike.',
                best_time: 'October to March', air: 'Nearest — Jaipur International (250 km)',
                train: 'Kota Junction Railway Station', road: 'Well connected via NH76 & NH12',
                map_link: 'https://maps.app.goo.gl/kota', image_url: 'images/kota/kota-cover.jpg'
            },
        ];

        const createdCities = await City.insertMany(citiesData);
        console.log(`🏙️  Inserted ${createdCities.length} cities.`);

        const getCityId = (name) => {
            const c = createdCities.find(c => c.city_name.toLowerCase() === name.toLowerCase());
            if (!c) throw new Error(`City not found: ${name}`);
            return c._id;
        };

        const jId  = getCityId('Jaipur');
        const uId  = getCityId('Udaipur');
        const joId = getCityId('Jodhpur');
        const jaId = getCityId('Jaisalmer');
        const bId  = getCityId('Bikaner');
        const kId  = getCityId('Kota');

        // ══════════════════════════════════════════
        // 2. PLACES
        // ══════════════════════════════════════════
        const placesData = [
            // JAIPUR
            { place_id:'P01', city_id:jId, name:'Hawa Mahal', type:'Palace',
              description:'The Palace of Winds — a stunning 5-storey pink sandstone facade with 953 intricately carved windows, built in 1799 for royal ladies to observe street life unseen.',
              timing:'9:00 AM – 5:30 PM', entry_fee:'₹50 (Indians) / ₹200 (Foreigners)',
              map_link:'https://maps.app.goo.gl/hawamahal', image_url:'images/jaipur/hawaMahal.jpg' },
            { place_id:'P02', city_id:jId, name:'Amer Fort', type:'Fort',
              description:'A magnificent hilltop fort from 1592, featuring the stunning Sheesh Mahal (Mirror Palace), Ganesh Pol, and panoramic views of the Maota Lake and Aravalli hills.',
              timing:'8:00 AM – 5:30 PM', entry_fee:'₹100 (Indians) / ₹500 (Foreigners)',
              map_link:'https://maps.app.goo.gl/amerfort', image_url:'images/jaipur/AmerFort.jpg' },
            { place_id:'P03', city_id:jId, name:'Nahargarh Fort', type:'Fort',
              description:'Perched on the Aravalli ridge, the Tiger Fort offers the most breathtaking panoramic views of Jaipur city, especially magical at sunset.',
              timing:'10:00 AM – 5:30 PM', entry_fee:'₹50 (Indians) / ₹200 (Foreigners)',
              map_link:'https://maps.app.goo.gl/nahargarh', image_url:'images/jaipur/nahargarhFort.jpg' },
            { place_id:'P04', city_id:jId, name:'City Palace', type:'Palace',
              description:'A royal complex in the heart of Jaipur showcasing a blend of Rajput, Mughal, and European architecture. Houses museums with royal artefacts, costumes, and weapons.',
              timing:'9:30 AM – 5:00 PM', entry_fee:'₹200 (Indians) / ₹700 (Foreigners)',
              map_link:'https://maps.app.goo.gl/citypalacejaipur', image_url:'images/jaipur/CityPalace.jpg' },
            { place_id:'P05', city_id:jId, name:'Jal Mahal', type:'Palace',
              description:'The Water Palace — a breathtaking five-storey palace that appears to float in the middle of Man Sagar Lake. Surrounded by the Nahargarh Hills, it is one of Jaipur\'s most iconic landmarks.',
              timing:'Viewable from shore (Exterior only)', entry_fee:'Free (exterior view)',
              map_link:'https://maps.app.goo.gl/jalmahal', image_url:'images/jaipur/jalMahal.jpg' },
            { place_id:'P06', city_id:jId, name:'Albert Hall Museum', type:'Museum',
              description:'The oldest museum of Rajasthan, built in 1887 in Indo-Saracenic style. Houses a rich collection of paintings, jewellery, ivory, stone, metal sculptures and works in crystal.',
              timing:'9:00 AM – 5:00 PM', entry_fee:'₹40 (Indians) / ₹300 (Foreigners)',
              map_link:'https://maps.app.goo.gl/alberthall', image_url:'images/jaipur/AlbertHall.jpg' },

            // UDAIPUR
            { place_id:'P07', city_id:uId, name:'City Palace Udaipur', type:'Palace',
              description:'The largest palace complex in Rajasthan, standing tall on the east bank of Lake Pichola. A fusion of Rajput and Mughal styles with gorgeous courtyards, balconies, and towers.',
              timing:'9:30 AM – 5:30 PM', entry_fee:'₹300 (Adults) / ₹100 (Children)',
              map_link:'https://maps.app.goo.gl/citypalaceudaipur', image_url:'images/udaipur/udaipur-cover.avif' },
            { place_id:'P08', city_id:uId, name:'Lake Pichola', type:'Lake',
              description:'An artificial freshwater lake created in 1362 AD. A boat ride here reveals the Lake Palace, Jag Mandir island, and the magnificent backdrop of the Aravalli hills — a romantic must-do.',
              timing:'8:00 AM – 6:00 PM (Boat rides)', entry_fee:'₹400 (Boat ride)',
              map_link:'https://maps.app.goo.gl/lakepichola', image_url:'images/udaipur/udaipur-cover.avif' },
            { place_id:'P09', city_id:uId, name:'Saheliyon ki Bari', type:'Garden',
              description:'The Garden of Maids of Honour — an ornate garden built for the royal ladies with lotus pools, marble elephants, fountains, and lush greenery. A serene oasis in the heart of Udaipur.',
              timing:'9:00 AM – 7:00 PM', entry_fee:'₹10 (Indians) / ₹50 (Foreigners)',
              map_link:'https://maps.app.goo.gl/saheliyon', image_url:'images/udaipur/udaipur-cover.avif' },

            // JODHPUR
            { place_id:'P10', city_id:joId, name:'Mehrangarh Fort', type:'Fort',
              description:'One of India\'s largest forts, perched 410 feet above Jodhpur city. Its massive walls house ornate palaces with exquisite stone carving, a world-class museum, and sweeping views of the Blue City below.',
              timing:'9:00 AM – 5:00 PM', entry_fee:'₹100 (Indians) / ₹600 (Foreigners)',
              map_link:'https://maps.app.goo.gl/mehrangarh', image_url:'images/jodhpur/jodhpur-cover.jpg' },
            { place_id:'P11', city_id:joId, name:'Jaswant Thada', type:'Monument',
              description:'A serene white marble cenotaph built in 1899 in memory of Maharaja Jaswant Singh II. Known as the Taj Mahal of Marwar, it reflects in a calm lake and is beautifully lit at night.',
              timing:'9:00 AM – 5:00 PM', entry_fee:'₹30 (Indians) / ₹50 (Foreigners)',
              map_link:'https://maps.app.goo.gl/jaswantthada', image_url:'images/jodhpur/jodhpur-cover.jpg' },
            { place_id:'P12', city_id:joId, name:'Umaid Bhawan Palace', type:'Palace',
              description:'One of the world\'s largest private residences, built between 1928–1943. Part museum, part heritage hotel — its Art Deco interiors and golden sandstone exterior make it a Jodhpur icon.',
              timing:'9:00 AM – 5:00 PM (Museum)', entry_fee:'₹50 (Museum)',
              map_link:'https://maps.app.goo.gl/umaidbhawan', image_url:'images/jodhpur/jodhpur-cover.jpg' },

            // JAISALMER
            { place_id:'P13', city_id:jaId, name:'Jaisalmer Fort', type:'Fort',
              description:'The Golden Fort — a UNESCO World Heritage Site and one of the world\'s largest fully preserved fortified cities. Still inhabited by about 3,000 people, with shops, temples, and havelis inside its walls.',
              timing:'Open 24 hrs (museum 9AM–6PM)', entry_fee:'Free (museum ₹50)',
              map_link:'https://maps.app.goo.gl/jaisalmerfort', image_url:'images/jaiselmer/jaiselmer-cover.jpg' },
            { place_id:'P14', city_id:jaId, name:'Sam Sand Dunes', type:'Desert',
              description:'The most famous dunes of the Thar Desert, located 42 km from Jaisalmer. Experience camel safaris, folk music evenings, traditional Rajasthani dance, and overnight desert camping under the Milky Way.',
              timing:'Sunrise to Sunset', entry_fee:'₹100–₹500 (camel ride)',
              map_link:'https://maps.app.goo.gl/samsanddunes', image_url:'images/jaiselmer/jaiselmer-cover.jpg' },
            { place_id:'P15', city_id:jaId, name:'Patwon ki Haveli', type:'Haveli',
              description:'The grandest of Jaisalmer\'s havelis, a cluster of five mansions built by Guman Chand Patwa between 1800–1860. Its intricate jali screens, golden stone carvings, and frescoes are breathtaking.',
              timing:'9:00 AM – 6:00 PM', entry_fee:'₹50 (Indians) / ₹200 (Foreigners)',
              map_link:'https://maps.app.goo.gl/patwonkihaveli', image_url:'images/jaiselmer/jaiselmer-cover.jpg' },

            // BIKANER
            { place_id:'P16', city_id:bId, name:'Junagarh Fort', type:'Fort',
              description:'An impregnable fort built in 1593, unique because it was never conquered. Its 37 palaces, temples, and pavilions showcase Rajput, Gujarati, and Mughal architectural influences with remarkably preserved interiors.',
              timing:'10:00 AM – 4:30 PM', entry_fee:'₹50 (Indians) / ₹300 (Foreigners)',
              map_link:'https://maps.app.goo.gl/junagarh', image_url:'images/bikaner/bikaner-cover.jpg' },
            { place_id:'P17', city_id:bId, name:'Karni Mata Temple', type:'Temple',
              description:'The famous Rat Temple of Deshnok, 30 km from Bikaner. Home to thousands of holy rats (called kabbas), this 15th-century temple is one of India\'s most unique spiritual sites.',
              timing:'4:00 AM – 10:00 PM', entry_fee:'Free',
              map_link:'https://maps.app.goo.gl/karnimata', image_url:'images/bikaner/bikaner-cover.jpg' },

            // KOTA
            { place_id:'P18', city_id:kId, name:'Kota Barrage', type:'Monument',
              description:'An engineering marvel on the Chambal River, the Kota Barrage controls irrigation and water supply for Rajasthan and Madhya Pradesh. The river view at sunset is spectacular with abundant birdlife.',
              timing:'6:00 AM – 8:00 PM', entry_fee:'Free',
              map_link:'https://maps.app.goo.gl/kotabarrage', image_url:'images/kota/kota-border.jpg' },
            { place_id:'P19', city_id:kId, name:'Jagmandir Palace', type:'Palace',
              description:'A stunning 17th-century palace built on a small island in Kishore Sagar lake. The crimson and white structure mirrored in the lake creates one of Rajasthan\'s most picturesque views.',
              timing:'8:00 AM – 6:00 PM', entry_fee:'₹10',
              map_link:'https://maps.app.goo.gl/jagmandir', image_url:'images/kota/kota-cover.jpg' },
        ];

        const createdPlaces = await Place.insertMany(placesData);
        console.log(`📍 Inserted ${createdPlaces.length} places.`);

        // ══════════════════════════════════════════
        // 3. FOOD
        // ══════════════════════════════════════════
        const foodData = [
            // JAIPUR
            { food_id:'F01', city_id:jId, name:'Chokhi Dhani', specialty:'Authentic Dal Baati Churma',
              description:'An iconic Rajasthani village-themed resort offering a traditional thali experience with folk music, puppet shows, and genuine Marwari hospitality.',
              map_link:'https://maps.app.goo.gl/chokhidhani', image_url:'images/jaipur/CHokhi-DHani.jpg' },
            { food_id:'F02', city_id:jId, name:'Laxmi Mishthan Bhandar (LMB)', specialty:'Ghewar & Mishri Mawa',
              description:'A legendary 1954 sweet shop in Johari Bazaar, famous for its Raj Bhog thali, Malpua, and the iconic Rajasthani Ghewar served with rabri.',
              map_link:'https://maps.app.goo.gl/lmbjaipur', image_url:'images/jaipur/LMB.jpg' },
            { food_id:'F03', city_id:jId, name:'Masala Chowk', specialty:'Street Food Festival',
              description:'A curated food court at Ram Niwas Garden showcasing 25+ stalls of authentic Jaipur street food — from Pyaaz Kachori to Kulfi — in a clean, open-air setting.',
              map_link:'https://maps.app.goo.gl/masalachowk', image_url:'images/jaipur/masalaChowk.jpg' },
            { food_id:'F04', city_id:jId, name:'Gulab Ji Chai', specialty:'Kulhad Chai & Makhan Bada',
              description:'Jaipur\'s most beloved tea stall serving aromatic chai in traditional clay cups. A morning ritual for locals since 1956, paired with Makhan Bada and crispy Namak Pare.',
              map_link:'https://maps.app.goo.gl/gulabji', image_url:'images/jaipur/GulabJiChai.jpg' },

            // UDAIPUR
            { food_id:'F05', city_id:uId, name:'Natraj Dining Hall', specialty:'Rajasthani Thali',
              description:'A heritage dining institution in Udaipur serving unlimited traditional Rajasthani thali with Dal Baati, Gatte ki Sabzi, Ker Sangri, and seasonal desserts since 1957.',
              map_link:'https://maps.app.goo.gl/natrajudaipur', image_url:'images/udaipur/udaipur-cover.avif' },
            { food_id:'F06', city_id:uId, name:'Millets of Mewar', specialty:'Healthy Rajasthani Cuisine',
              description:'A unique restaurant celebrating traditional millet-based cuisine of Rajasthan — serving Bajra Rotla, Jowar dishes, and Ragi desserts alongside breathtaking lake views.',
              map_link:'https://maps.app.goo.gl/milletsudaipur', image_url:'images/udaipur/udaipur-cover.avif' },

            // JODHPUR
            { food_id:'F07', city_id:joId, name:'Shri Mishrilal Hotel', specialty:'Makhania Lassi',
              description:'Jodhpur\'s most famous landmark for the legendary thick, saffron-flavoured Makhania Lassi — a creamy yoghurt drink topped with clotted cream, a must-try for every visitor since 1925.',
              map_link:'https://maps.app.goo.gl/mishrilal', image_url:'images/jodhpur/jodhpur-cover.jpg' },
            { food_id:'F08', city_id:joId, name:'Gypsy Restaurant', specialty:'Laal Maas',
              description:'One of Jodhpur\'s finest rooftop restaurants serving the iconic Laal Maas — a fiery Rajasthani lamb curry made with Mathania red chillies — with stunning fort views.',
              map_link:'https://maps.app.goo.gl/gypsyjodhpur', image_url:'images/jodhpur/jodhpur-cover.jpg' },

            // JAISALMER
            { food_id:'F09', city_id:jaId, name:'Trio Restaurant', specialty:'Desert Thali',
              description:'A rooftop restaurant inside the fort with panoramic desert views, serving authentic Rajasthani thali, Ker Sangri, and camel milk desserts — the best dining experience in Jaisalmer.',
              map_link:'https://maps.app.goo.gl/triojaisalmer', image_url:'images/jaiselmer/jaiselmer-cover.jpg' },

            // BIKANER
            { food_id:'F10', city_id:bId, name:'Haldiram\'s Bhujia Bhandar', specialty:'Bikaner Bhujia',
              description:'The birthplace of the world-famous Bikaner Bhujia — a crispy moth-bean snack. The original Haldiram shop in Bikaner is where this globally loved snack was first created in 1937.',
              map_link:'https://maps.app.goo.gl/haldirams', image_url:'images/bikaner/bikaner-cover.jpg' },

            // KOTA
            { food_id:'F11', city_id:kId, name:'Kesari Restaurant', specialty:'Kota Kachori',
              description:'Kota\'s most celebrated eatery for the legendary Kota Kachori — a crispy, spiced puff pastry unique to Kota, served with green chutney. A breakfast staple for the city\'s residents.',
              map_link:'https://maps.app.goo.gl/kesarikota', image_url:'images/kota/kota-cover.jpg' },
        ];

        const createdFood = await Food.insertMany(foodData);
        console.log(`🍲 Inserted ${createdFood.length} food spots.`);

        // ══════════════════════════════════════════
        // 4. SHOPPING
        // ══════════════════════════════════════════
        const shoppingData = [
            // JAIPUR
            { shop_id:'S01', city_id:jId, name:'Bapu Bazaar', famous_for:'Mojari shoes, block-print textiles & Rajasthani handicrafts',
              best_time:'11:00 AM – 8:00 PM', map_link:'https://maps.app.goo.gl/bapubazaar', image_url:'images/jaipur/bapuBazaar.jpg' },
            { shop_id:'S02', city_id:jId, name:'Johari Bazaar', famous_for:'Gemstones, jewellery, Kundan & Meenakari jewellery',
              best_time:'11:00 AM – 8:00 PM', map_link:'https://maps.app.goo.gl/joharibazaar', image_url:'images/jaipur/bapuBazaar.jpg' },
            { shop_id:'S03', city_id:jId, name:'World Trade Park', famous_for:'Modern mall — brands, food court & entertainment',
              best_time:'10:00 AM – 10:00 PM', map_link:'https://maps.app.goo.gl/wtp', image_url:'images/jaipur/WTP.jpg' },

            // UDAIPUR
            { shop_id:'S04', city_id:uId, name:'Hathi Pol Bazaar', famous_for:'Pichwai paintings, Phad art & traditional Udaipur handicrafts',
              best_time:'10:00 AM – 7:00 PM', map_link:'https://maps.app.goo.gl/hathipol', image_url:'images/udaipur/udaipur-cover.avif' },
            { shop_id:'S05', city_id:uId, name:'Bada Bazaar', famous_for:'Silver jewellery, miniature paintings, tie-dye fabrics',
              best_time:'10:00 AM – 8:00 PM', map_link:'https://maps.app.goo.gl/badabazarudaipur', image_url:'images/udaipur/udaipur-cover.avif' },

            // JODHPUR
            { shop_id:'S06', city_id:joId, name:'Sardar Market (Ghanta Ghar)', famous_for:'Spices, tie-dye bandhani fabrics & antiques',
              best_time:'9:00 AM – 9:00 PM', map_link:'https://maps.app.goo.gl/sardarmarket', image_url:'images/jodhpur/jodhpur-cover.jpg' },

            // JAISALMER
            { shop_id:'S07', city_id:jaId, name:'Sadar Bazaar Jaisalmer', famous_for:'Camel leather goods, mirror-work textiles & silver jewellery',
              best_time:'9:00 AM – 8:00 PM', map_link:'https://maps.app.goo.gl/sadarbazaarjaisalmer', image_url:'images/jaiselmer/jaiselmer-cover.jpg' },

            // BIKANER
            { shop_id:'S08', city_id:bId, name:'Kote Gate Bazaar', famous_for:'Woollen shawls, Usta art (camel hide decoration) & local Bhujia',
              best_time:'10:00 AM – 7:00 PM', map_link:'https://maps.app.goo.gl/kotegatebikaner', image_url:'images/bikaner/bikaner-cover.jpg' },

            // KOTA
            { shop_id:'S09', city_id:kId, name:'Kota Doria Emporium', famous_for:'Kota Doria sarees — the finest cotton-silk weave of Rajasthan',
              best_time:'10:00 AM – 6:00 PM', map_link:'https://maps.app.goo.gl/kotadoria', image_url:'images/kota/kota-cover.jpg' },
        ];

        const createdShopping = await Shopping.insertMany(shoppingData);
        console.log(`🛍️  Inserted ${createdShopping.length} shopping spots.`);

        // ══════════════════════════════════════════
        // 5. ITINERARIES — 3 days per city
        // ══════════════════════════════════════════
        const itineraries = [

            // ── JAIPUR ──
            { cityId:jId, day:1, title:'Royal Forts & Palaces',
              activities:[
                { time:'07:00 AM', location:'Amer Fort', description:'Start early to beat the crowds at the majestic hilltop fort. Explore Sheesh Mahal, Ganesh Pol, and enjoy an optional elephant ride to the top.' },
                { time:'11:00 AM', location:'Jaigarh Fort', description:'Walk or take a jeep to the adjacent Jaigarh Fort housing the world\'s largest wheeled cannon — Jaivana.' },
                { time:'01:30 PM', location:'Anokhi Café (near Amer)', description:'Enjoy a light lunch at this heritage café known for healthy Indian and continental meals.' },
                { time:'03:00 PM', location:'City Palace', description:'Explore the royal palace complex, its museums, the Chandra Mahal, and the iconic Mubarak Mahal.' },
                { time:'05:30 PM', location:'Hawa Mahal', description:'The golden evening light on the Palace of Winds makes for stunning photographs. Climb to the top for a panoramic view.' },
              ],
              tips:['Book Amer Fort tickets online to skip queues', 'Dress modestly — it\'s a heritage site', 'Carry water; Jaipur can be warm even in winters'] },

            { cityId:jId, day:2, title:'Markets, Museums & Magical Views',
              activities:[
                { time:'08:30 AM', location:'Gulab Ji Chai', description:'Start your morning with Jaipur\'s iconic kulhad chai and hot Makhan Bada — the locals\' breakfast ritual.' },
                { time:'09:30 AM', location:'Albert Hall Museum', description:'Spend an hour exploring this stunning Indo-Saracenic building housing ancient artefacts, Egyptian mummies, and Rajasthani art.' },
                { time:'11:30 AM', location:'Johari Bazaar', description:'Browse glittering Kundan and Meenakari jewellery. Visit the famous Maniharon ka Rasta for lac bangles.' },
                { time:'01:30 PM', location:'LMB Restaurant', description:'Enjoy the famous Raj Bhog thali at this 70-year-old Jaipur institution.' },
                { time:'03:30 PM', location:'Nahargarh Fort', description:'Head to the Tiger Fort for the most spectacular sunset view over the Pink City. Don\'t miss the Padao restaurant inside the fort.' },
              ],
              tips:['Bargain confidently in Johari Bazaar', 'LMB gets crowded — arrive by 1:30 PM', 'Nahargarh sunset is unmissable — stay till 6:30 PM'] },

            { cityId:jId, day:3, title:'Hidden Gems & Culinary Journey',
              activities:[
                { time:'08:00 AM', location:'Jal Mahal', description:'The Water Palace looks magical at dawn. Walk the lakeside promenade for a peaceful morning start.' },
                { time:'09:30 AM', location:'Masala Chowk', description:'Explore 25+ food stalls at this curated street food hub — try Pyaaz Kachori, Mirchi Bada, and Kulfi.' },
                { time:'11:00 AM', location:'Bapu Bazaar', description:'Shop for hand-crafted Mojari shoes, block-print dupattas, and authentic Rajasthani home décor.' },
                { time:'01:30 PM', location:'Chokhi Dhani', description:'A village-themed resort for an authentic Rajasthani lunch thali with folk performances.' },
                { time:'04:30 PM', location:'Birla Mandir', description:'Visit the serene white marble temple at dusk — beautifully lit in the evening with views over the city.' },
              ],
              tips:['Chokhi Dhani is 20 km from city — plan transport', 'Bapu Bazaar fixed-price shops are more reliable for quality', 'Keep Day 3 relaxed — great for shopping and food'] },

            // ── UDAIPUR ──
            { cityId:uId, day:1, title:'Lakes, Palaces & Lake Views',
              activities:[
                { time:'09:00 AM', location:'City Palace', description:'Explore the grand palace complex. The Crystal Gallery and the panoramic view of Lake Pichola from Mor Chowk are highlights.' },
                { time:'12:00 PM', location:'Ambrai Ghat', description:'Enjoy a lakeside lunch at the famous Ambrai restaurant — the view of City Palace and Lake Palace from here is extraordinary.' },
                { time:'02:30 PM', location:'Lake Pichola Boat Ride', description:'Take the government boat tour of the lake stopping at Jag Mandir island — a floating 17th-century palace.' },
                { time:'05:30 PM', location:'Bagore ki Haveli', description:'Watch the famous cultural show at 7 PM featuring folk dances, puppet shows, and traditional Rajasthani music.' },
              ],
              tips:['Book City Palace tickets online', 'Boat rides are most beautiful at golden hour (5–6 PM)', 'Bagore ki Haveli show starts at 7 PM — reach by 6:30 PM'] },

            { cityId:uId, day:2, title:'Gardens, Temples & Old City Walk',
              activities:[
                { time:'08:30 AM', location:'Saheliyon ki Bari', description:'The serene garden of fountains and lotus pools — peaceful and beautiful in the morning light.' },
                { time:'10:30 AM', location:'Fateh Sagar Lake', description:'A 20-minute walk around the lake, visit the Nehru Island garden and enjoy the mountain backdrop.' },
                { time:'12:30 PM', location:'Millets of Mewar', description:'A unique lunch experience with traditional millet-based Rajasthani cuisine with a view of Fateh Sagar.' },
                { time:'02:30 PM', location:'Jagdish Temple', description:'Visit the 17th-century Vishnu temple with its stunning carvings — a living monument in the heart of old Udaipur.' },
                { time:'04:00 PM', location:'Hathi Pol Bazaar', description:'Shop for Pichwai art, silver jewellery, and unique Udaipuri miniature paintings.' },
              ],
              tips:['Hathi Pol Bazaar is most active 4–7 PM', 'Fateh Sagar is great for a morning walk', 'Udaipur restaurants book up fast — reserve in advance'] },

            { cityId:uId, day:3, title:'Monsoon Palace & Village Heritage',
              activities:[
                { time:'09:00 AM', location:'Shilpgram', description:'A rural arts and crafts centre 3 km from Udaipur showcasing the lifestyle and handicrafts of tribal communities.' },
                { time:'11:30 AM', location:'Vintage Car Museum', description:'View the Mewar royal family\'s stunning collection of classic cars — Rolls-Royces, Cadillacs, and more.' },
                { time:'01:30 PM', location:'Natraj Dining Hall', description:'Enjoy a hearty traditional Rajasthani unlimited thali — the best value meal in Udaipur.' },
                { time:'03:30 PM', location:'Monsoon Palace (Sajjangarh)', description:'Drive up to this hilltop palace for the most panoramic sunset view over Udaipur\'s lakes and the Aravalli range.' },
              ],
              tips:['Sajjangarh is 15 km from city — hire an auto or taxi', 'Go to Monsoon Palace 90 minutes before sunset', 'Shilpgram has a great craft fair in December'] },

            // ── JODHPUR ──
            { cityId:joId, day:1, title:'The Blue City & Mehrangarh Fort',
              activities:[
                { time:'08:00 AM', location:'Shri Mishrilal Hotel', description:'Start with Jodhpur\'s legendary Makhania Lassi — thick, creamy, saffron-flavoured. The best breakfast in the city.' },
                { time:'09:30 AM', location:'Mehrangarh Fort', description:'Spend 3 hours at one of India\'s mightiest forts. The museum, the Phool Mahal, Moti Mahal, and the armoury are unmissable.' },
                { time:'01:00 PM', location:'Jaswant Thada', description:'Visit the white marble cenotaph adjacent to the fort — peaceful, photogenic, and beautifully reflected in the lake.' },
                { time:'03:00 PM', location:'Sardar Market', description:'Explore the vibrant clock tower market for spices, textiles, tie-dye fabrics, and silverware.' },
                { time:'06:00 PM', location:'Gypsy Rooftop Restaurant', description:'Watch the sunset over the Blue City with a view of Mehrangarh Fort while enjoying Laal Maas.' },
              ],
              tips:['Hire a local guide at Mehrangarh — stories make it 10x better', 'Sardar Market is best in the late afternoon', 'Walk through the blue lanes of Navchokiya for amazing photos'] },

            { cityId:joId, day:2, title:'Palaces, Villages & Desert Edge',
              activities:[
                { time:'09:00 AM', location:'Umaid Bhawan Palace', description:'Visit the museum wing of this Art Deco masterpiece — one of the world\'s largest private residences, with royal memorabilia.' },
                { time:'11:30 AM', location:'Toorji Ka Jhalra (Stepwell)', description:'A stunning 18th-century stepwell restored to its former glory — one of Jodhpur\'s most Instagrammable hidden gems.' },
                { time:'01:00 PM', location:'On the Rocks', description:'Lunch at this popular restaurant built around natural rock formations with great Rajasthani food and ambience.' },
                { time:'03:00 PM', location:'Bishnoi Village Safari', description:'An afternoon jeep safari to the eco-conscious Bishnoi village community — see traditional crafts, wildlife, and the famous Bishnoi people who protect the Blackbuck.' },
              ],
              tips:['Toorji Ka Jhalra is best in morning light', 'Book Bishnoi safari with your hotel', 'Umaid Bhawan photography is allowed in museum only'] },

            // ── JAISALMER ──
            { cityId:jaId, day:1, title:'The Golden Fort & Havelis',
              activities:[
                { time:'09:00 AM', location:'Jaisalmer Fort', description:'Enter the living fort and explore its narrow lanes, Jain temples (12th century), merchants\' havelis, and the Raj Mahal. The golden sandstone glows magnificently in morning light.' },
                { time:'11:30 AM', location:'Patwon ki Haveli', description:'Marvel at the five interconnected mansions with some of the finest stone carving in Rajasthan.' },
                { time:'01:30 PM', location:'Trio Restaurant', description:'Rooftop lunch inside the fort with a panoramic desert and fort view — try the desert thali.' },
                { time:'03:30 PM', location:'Gadisar Lake', description:'Visit the beautiful reservoir outside the fort built in 1367 AD. Rent a boat and enjoy the ornate shrines on the banks.' },
                { time:'05:30 PM', location:'Sunset Point', description:'Watch the sun melt into the Thar Desert from the ramparts of Jaisalmer Fort — one of India\'s most magnificent sunsets.' },
              ],
              tips:['Start fort exploration early — it gets hot by noon', 'Carry cash inside the fort — few ATMs', 'Wear comfortable shoes for the cobblestone lanes'] },

            { cityId:jaId, day:2, title:'Desert Safari & Stargazing',
              activities:[
                { time:'04:30 PM', location:'Sam Sand Dunes', description:'Head to the dunes for a camel safari at golden hour — the shifting light on the dunes is extraordinary. Watch traditional Rajasthani folk dance and music.' },
                { time:'07:30 PM', location:'Desert Camp', description:'Overnight desert camp dinner under a million stars. The Thar Desert has some of the darkest skies in India — perfect for stargazing.' },
              ],
              tips:['Book desert camp 2–3 days in advance', 'Carry a warm layer — desert nights are cold November–February', 'Photography at sunset dunes is breathtaking — wide angle lens recommended'] },

            // ── BIKANER ──
            { cityId:bId, day:1, title:'Forts, Temples & Local Flavours',
              activities:[
                { time:'09:00 AM', location:'Junagarh Fort', description:'Explore 37 palaces within this never-conquered fort — Anup Mahal with its gold-leaf work and mirror paintings is a highlight.' },
                { time:'12:00 PM', location:'Haldiram\'s Original Shop', description:'Visit the birthplace of the world-famous Bikaner Bhujia. Buy fresh bhujia, rasgullas, and soan papdi directly from the source.' },
                { time:'02:00 PM', location:'Karni Mata Temple', description:'Drive 30 km to Deshnok to visit the famous Rat Temple — a truly one-of-a-kind spiritual experience.' },
                { time:'05:00 PM', location:'Kote Gate Bazaar', description:'Shop for Usta art (camel-hide work), woollen shawls, and local Bikaner handicrafts.' },
              ],
              tips:['Remove shoes at Karni Mata Temple', 'Junagarh Fort guide is mandatory — available at entry', 'Bikaner is known for its wool products — great for shopping'] },

            // ── KOTA ──
            { cityId:kId, day:1, title:'Palaces, Chambal & Kota Kachori',
              activities:[
                { time:'08:30 AM', location:'Kesari Restaurant', description:'Start your Kota morning with the legendary Kota Kachori — crispy, spiced puffed pastry unique to this city.' },
                { time:'10:00 AM', location:'Kota Garh (City Palace)', description:'Explore the palace museum with a rare collection of arms, armour, elephant howdahs, and miniature Hadoti paintings.' },
                { time:'12:30 PM', location:'Jagmandir Palace', description:'Take a boat to the island palace in Kishore Sagar lake — the crimson-white palace reflected in water is stunning.' },
                { time:'03:00 PM', location:'Kota Barrage', description:'Walk along the Chambal riverfront at the barrage — spot crocodiles, Gharials, river dolphins, and migratory birds.' },
                { time:'05:00 PM', location:'Chambal Garden', description:'A beautiful riverside garden perfect for an evening stroll with views of the Chambal River.' },
              ],
              tips:['Kishore Sagar boat ride runs till 5 PM', 'Kota Barrage is excellent for birdwatching Oct–Feb', 'Kota Doria sarees are the best souvenir to buy'] },
        ];

        await Itinerary.insertMany(itineraries);
        console.log(`📅 Inserted ${itineraries.length} itinerary days.`);

        console.log('\n🎉 Database fully seeded with rich data!');
        console.log('   6 Cities | 19 Places | 11 Food Spots | 9 Shopping | 14 Itinerary Days\n');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();

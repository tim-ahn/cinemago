--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE public.users ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public.reviews ALTER COLUMN "reviewId" DROP DEFAULT;
ALTER TABLE public.messages ALTER COLUMN "messageId" DROP DEFAULT;
ALTER TABLE public.lists ALTER COLUMN "listId" DROP DEFAULT;
DROP SEQUENCE public."users_userId_seq";
DROP TABLE public.users;
DROP SEQUENCE public."reviews_reviewId_seq";
DROP TABLE public.reviews;
DROP TABLE public.movies;
DROP SEQUENCE public."messages_messageId_seq";
DROP TABLE public.messages;
DROP SEQUENCE public."lists_listId_seq";
DROP TABLE public.lists;
DROP TABLE public."listItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: listItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."listItems" (
    "listId" integer NOT NULL,
    "movieId" integer NOT NULL
);


--
-- Name: lists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lists (
    "userId" integer NOT NULL,
    "listId" integer NOT NULL,
    type text NOT NULL,
    name text NOT NULL
);


--
-- Name: lists_listId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."lists_listId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lists_listId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."lists_listId_seq" OWNED BY public.lists."listId";


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    "senderId" integer NOT NULL,
    "recipientId" integer NOT NULL,
    content text NOT NULL,
    "sentAt" timestamp without time zone,
    "messageId" integer NOT NULL
);


--
-- Name: messages_messageId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."messages_messageId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: messages_messageId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."messages_messageId_seq" OWNED BY public.messages."messageId";


--
-- Name: movies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.movies (
    title text NOT NULL,
    "movieId" integer NOT NULL,
    description text NOT NULL,
    "posterURL" text,
    reviews json NOT NULL,
    "releaseDate" text NOT NULL
);


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reviews (
    "userId" integer NOT NULL,
    "reviewId" integer NOT NULL,
    rating integer NOT NULL,
    content text,
    "movieId" integer NOT NULL,
    title text
);


--
-- Name: reviews_reviewId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."reviews_reviewId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reviews_reviewId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."reviews_reviewId_seq" OWNED BY public.reviews."reviewId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    name text NOT NULL,
    password text NOT NULL,
    bio text,
    "imageURL" text,
    email text NOT NULL
);


--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: lists listId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lists ALTER COLUMN "listId" SET DEFAULT nextval('public."lists_listId_seq"'::regclass);


--
-- Name: messages messageId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages ALTER COLUMN "messageId" SET DEFAULT nextval('public."messages_messageId_seq"'::regclass);


--
-- Name: reviews reviewId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews ALTER COLUMN "reviewId" SET DEFAULT nextval('public."reviews_reviewId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: listItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."listItems" ("listId", "movieId") FROM stdin;
2	299536
3	15016
30	27205
35	27205
51	38575
48	299534
55	299536
47	336560
56	64956
56	10923
3	296828
3	299537
3	24428
3	299536
3	299534
3	99861
1	604605
1	372058
1	36865
1	483439
1	566452
1	566460
1	129
1	8392
1	553600
1	20986
1	378064
\.


--
-- Data for Name: lists; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.lists ("userId", "listId", type, name) FROM stdin;
1	1	favorites	My Favorites
1	2	watch	My Watch List
2	3	favorites	My Favorites
2	4	watch	My Watch List
10	31	watch	My Watch List
10	32	favorites	My Favorites List
11	33	watch	My Watch List
11	34	favorites	My Favorites List
12	35	watch	My Watch List
12	36	favorites	My Favorites List
12	37	custom	Cool Movies
13	40	favorites	My Favorites List
13	41	watch	My Watch List
14	42	favorites	My Favorites List
14	43	watch	My Watch List
15	44	favorites	My Favorites List
15	45	watch	My Watch List
15	46	custom	hi
2	47	custom	Cool Movies 2
16	48	favorites	My Favorites List
16	49	watch	My Watch List
16	51	custom	cool
17	53	favorites	My Favorites List
17	54	watch	My Watch List
17	55	custom	Cool Movies
1	56	custom	code
1	57	custom	Cool Movies
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.messages ("senderId", "recipientId", content, "sentAt", "messageId") FROM stdin;
1	2	hey there I 	\N	5
2	1	ffffffffggggg	\N	6
2	1	test1	\N	7
\.


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.movies (title, "movieId", description, "posterURL", reviews, "releaseDate") FROM stdin;
Inception	27205	Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: "inception", the implantation of another person's idea into a target's subconscious.	/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg	{"reviews":"not yet"}	2010-07-15
Avengers: Infinity War	299536	As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.	/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg	{"reviews":"not yet"}	2018-04-25
Avengers: Endgame	299534	After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.	/or06FN3Dka5tukK1e9sl16pB3iy.jpg	{"reviews":"not yet"}	2019-04-24
Barbie of Swan Lake	15016	Barbie as Odette, the young daughter of a baker, follows a unicorn into the Enchanted Forest and is transformed into a swan by an evil wizard intent on defeating the Fairy Queen.	/sLpCLVQWTU7BI4yAL6kIFM9J3eX.jpg	{"reviews":"not yet"}	2003-09-28
Inception: The Cobol Job	64956	The Cobol Job is a fourteen-minute animated prequel to Christopher Nolan’s award-winning movie: Inception, detailing the heist on Mr. Kaneda's mind by Nash, Cobb, Arthur, and several Cobol Engineering thugs.	/sNxqwtyHMNQwKWoFYDqcYTui5Ok.jpg	{"reviews":"not yet"}	2010-12-07
Inception: Jump right into the action	616445	Blu-Ray extra of the making of Inception. Join filmmaker Christopher Nolan and his cast and crew as they reveal the secrets of Inception, its development, characters, performances, story and jaw-dropping special effects in this solid 14-segments piece.	/yEy9UJtuzWwUUKO463gGl4qisxt.jpg	{"reviews":"not yet"}	2010-12-07
The Karate Kid	38575	12-year-old Dre Parker could have been the most popular kid in Detroit, but his mother's latest career move has landed him in China. Dre immediately falls for his classmate Mei Ying but the cultural differences make such a friendship impossible. Even worse, Dre's feelings make him an enemy of the class bully, Cheng. With no friends in a strange land, Dre has nowhere to turn but maintenance man Mr. Han, who is a kung fu master. As Han teaches Dre that kung fu is not about punches and parries, but maturity and calm, Dre realizes that facing down the bullies will be the fight of his life.	/tAMQREOoztvluqrfHiGHFVfB04B.jpg	{"reviews":"not yet"}	2010-06-10
Lake Placid vs. Anaconda	336560	A giant alligator goes head to head with a giant Anaconda. The town sheriff must find a way to destroy the two monsters before they kill the whole town.	/vWTTolhnR1yW7z1YAIC5vrTn4s8.jpg	{"reviews":"not yet"}	2015-04-25
The Secret Garden	521034	Mary Lennox is born in India to wealthy British parents who never wanted her. When her parents suddenly die, she is sent back to England to live with her uncle. She meets her sickly cousin, and the two children find a wondrous secret garden lost in the grounds of Misselthwaite Manor.	/qqcRtoy5aqYGmEOOWE1DzT4uTc9.jpg	{"reviews":"not yet"}	2020-07-08
Black Water: Abyss	522444	An adventure-loving couple convince their friends to explore a remote, uncharted cave system in the forests of Northern Australia. With a tropical storm approaching, they abseil into the mouth of the cave, but when the caves start to flood, tensions rise as oxygen levels fall and the friends find themselves trapped. Unknown to them, the storm has also brought in a pack of dangerous and hungry crocodiles.	/ysFxqlf0qjPxt4c8BRvLfuQqsAK.jpg	{"reviews":"not yet"}	2020-07-09
Agent Cody Banks	10923	Recruited by the U.S. government to be a special agent, nerdy teenager Cody Banks must get closer to cute classmate Natalie in order to learn about an evil plan hatched by her father. But despite the agent persona, Cody struggles with teen angst.	/fhK0mqqirPsckxkNisvi32A4lf6.jpg	{"reviews":"not yet"}	2003-03-14
Captain Marvel	299537	The story follows Carol Danvers as she becomes one of the universe’s most powerful heroes when Earth is caught in the middle of a galactic war between two alien races. Set in the 1990s, Captain Marvel is an all-new adventure from a previously unseen period in the history of the Marvel Cinematic Universe.	/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg	{"reviews":"not yet"}	2019-03-06
The Avengers	24428	When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!	/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg	{"reviews":"not yet"}	2012-04-25
Avengers: Age of Ultron	99861	When Tony Stark tries to jumpstart a dormant peacekeeping program, things go awry and Earth’s Mightiest Heroes are put to the ultimate test as the fate of the planet hangs in the balance. As the villainous Ultron emerges, it is up to The Avengers to stop him from enacting his terrible plans, and soon uneasy alliances and unexpected action pave the way for an epic and unique global adventure.	/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg	{"reviews":"not yet"}	2015-04-22
Hello World	604605	Year 2027, The city of Kyoto has undergone tremendous advancement. Within the city lives Naomi Katagaki, an introvert and Ruri Ichigyou, a girl with a cold personality. Both shares love for reading books. Despite having similar interests, Naomi is afraid to approach Ruri due to her unfriendly nature.  One day, as Naomi goes out for a walk, a crimson aurora pierces through the sky for a brief moment. Shortly after, he sees a three-legged crow and a mysterious man who reveals himself to be Naomi from 10 years in the future, explaining that he has come to change a tragic event that happens to Ruri shortly after they start dating. Naomi follows his future self's instructions and starts getting closer to Ruri, determined to save her.  With the help of his future self, Naomi begins his preparations to save Ruri. Will he be able to change the future?	/r6BWky420eJQ0KbtUTlY06ZzFwU.jpg	{"reviews":"not yet"}	2019-09-20
Your Name.	372058	High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki’s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.	/q719jXXEzOoYaps6babgKnONONX.jpg	{"reviews":"not yet"}	2016-08-26
The Disappearance of Haruhi Suzumiya	36865	It is mid-december, and SOS Brigade chief Haruhi Suzumiya announces that the Brigade is going to hold a Christmas party in their clubroom, with Japanese hotpot for dinner. The brigade members Kyon, Yuki Nagato, Mikuru Asahina and Itsuki Koizumi start preparing everything for the party, such as costumes and decorations. But a couple of days later, Kyon arrives at school only to find that Haruhi is missing. Not only that, but Mikuru claims she has never known Kyon before, Koizumi is also missing, and Yuki has become the sole member of the literature club. The SOS Brigade seems to have never existed, nor has Haruhi Suzumiya. No one in the school has ever heard about her… except for Kyon.	/iWu5Gq49UTOltiAhP0oJfPnZQuQ.jpg	{"reviews":"not yet"}	2010-02-05
The Symphony of Haruhi Suzumiya	483439	The Symphony of Haruhi Suzumiya or The String Performance of Haruhi Suzumiya (涼宮ハルヒの弦奏 Suzumiya Haruhi no Gensou), was an event featuring several songs and background music used in the The Melancholy of Haruhi Suzumiya anime. All of the songs are performed by the Tokyo Philharmonic Orchestra, and conducted by Phillip Chu, on April 29, 2009.	/aVuRXDbVxD89dwp4RAzoBMIU3R1.jpg	{"reviews":"not yet"}	2009-04-29
K-On!: Live House!	566452	Houkago Tea Time performs live on New Year's Eve.	/jjnbpiym29NCXLXEKd7zMi1LS1J.jpg	{"reviews":"not yet"}	2010-01-19
K-On!!: Keikaku!	566460	A special episode of K-ON!! released in the ninth volume of Blu-ray and DVD. The girls plan a trip abroad and go to the passport office to apply for passports.	/cV8RHPwwdZ2J7obpcmVcDWEtuK0.jpg	{"reviews":"not yet"}	2011-03-16
Spirited Away	129	A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.	/2TeJfUZMGolfDdW6DKhfIWqvq8y.jpg	{"reviews":"not yet"}	2001-07-20
My Neighbor Totoro	8392	Two sisters move to the country with their father in order to be closer to their hospitalized mother, and discover the surrounding trees are inhabited by Totoros, magical spirits of the forest. When the youngest runs away from home, the older sister seeks help from the spirits to find her.	/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg	{"reviews":"not yet"}	1988-04-16
Promare	553600	Galo and the Burning Rescue Fire Department face off against BURNISH, a group of mutants who are able to control and wield flames, and the fire disaster they have unleashed on Earth.	/wBkrkL7mztyK1df3NBJKBiASNIY.jpg	{"reviews":"not yet"}	2019-05-24
Gurren Lagann The Movie: Childhood's End	20986	Simon and Kamina live in an underground city monitored by the village chief. When Simon stumbles upon an artifact and beastmen invade from the surface, Simon and Kamina rebel against them.	/nNjFlv4mJlkGLzfnLoU68YSy9KH.jpg	{"reviews":"not yet"}	2008-09-06
A Silent Voice	378064	Shouya Ishida starts bullying the new girl in class, Shouko Nishimiya, because she is deaf. But as the teasing continues, the rest of the class starts to turn on Shouya for his lack of compassion. When they leave elementary school, Shouko and Shouya do not speak to each other again... until an older, wiser Shouya, tormented by his past behaviour, decides he must see Shouko once more. He wants to atone for his sins, but is it already too late...?	/drlyoSKDOPnxzJFrRWGqzDsyJvR.jpg	{"reviews":"not yet"}	2016-09-17
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reviews ("userId", "reviewId", rating, content, "movieId", title) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId", name, password, bio, "imageURL", email) FROM stdin;
13	ddd	aaa	\N	\N	sss
14	ddd	ddd	\N	\N	ddd
15	rrr	rrr	\N	\N	rrr
16	cccc	xx	I'm cccc	\N	xx
2	Cody	coding	I like coding and teaching. nuff said	../images/user-images/bearded-dragon-1.jpg	cody@gmail.com
1	Uzair	anime	I like anime and fast cars. nuff said.  ggg	../images/user-images/newgame-nene.png	uzair@gmail.com
\.


--
-- Name: lists_listId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."lists_listId_seq"', 57, true);


--
-- Name: messages_messageId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."messages_messageId_seq"', 7, true);


--
-- Name: reviews_reviewId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."reviews_reviewId_seq"', 12, true);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 17, true);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--


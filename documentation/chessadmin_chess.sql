-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 28 mars 2024 à 15:24
-- Version du serveur : 8.0.33-cll-lve
-- Version de PHP : 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `chessadmin_chess`
--

-- --------------------------------------------------------

--
-- Structure de la table `game`
--

CREATE TABLE `game` (
  `idGame` int NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `game`
--

INSERT INTO `game` (`idGame`, `url`) VALUES
(266, 'gamesFiles/2_1711613987955.json'),
(267, 'gamesFiles/2_1711613995413.json'),
(268, 'gamesFiles/2_1711614000637.json'),
(269, 'gamesFiles/2_1711614272620.json'),
(270, 'gamesFiles/1_1711614498786.json'),
(271, 'gamesFiles/1_1711614656455.json');

-- --------------------------------------------------------

--
-- Structure de la table `userasgame`
--

CREATE TABLE `userasgame` (
  `idUserAsGame` int NOT NULL,
  `fkUser1` int NOT NULL,
  `fkUser2` int NOT NULL,
  `fkGame` int NOT NULL,
  `colorTurn` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'white',
  `user1Color` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user2Color` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `finished` tinyint(1) NOT NULL,
  `winner` int DEFAULT NULL,
  `looser` int DEFAULT NULL,
  `createdAt` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `userasgame`
--

INSERT INTO `userasgame` (`idUserAsGame`, `fkUser1`, `fkUser2`, `fkGame`, `colorTurn`, `user1Color`, `user2Color`, `finished`, `winner`, `looser`, `createdAt`) VALUES
(259, 2, 1, 266, 'white', 'white', 'black', 0, NULL, NULL, '2024-03-28 08:19:48.002'),
(260, 2, 1, 267, 'white', 'black', 'white', 0, NULL, NULL, '2024-03-28 08:19:55.450'),
(261, 2, 1, 268, 'white', 'white', 'black', 0, NULL, NULL, '2024-03-28 08:20:00.672'),
(262, 2, 1, 269, 'white', 'white', 'black', 0, NULL, NULL, '2024-03-28 08:24:32.659'),
(263, 1, 2, 270, 'white', 'white', 'black', 0, NULL, NULL, '2024-03-28 08:28:18.819'),
(264, 1, 2, 271, 'black', 'white', 'black', 0, NULL, NULL, '2024-03-28 08:30:56.467');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `idUser` int NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`idUser`, `username`, `password`) VALUES
(1, 'max', '$2b$10$Zzyr5vIjr6Gky9cSg5tRcOByfSldt9FDHoZIny1k56lUCdzvmizYm'),
(2, 'poi', '$2b$10$MA.lKzQVXZvH2j21cUrIqO6GgQKU.aKZhIfH.f5/yF/1kODaSmLgS'),
(3, 'lkj', '$2b$10$Vo9SE8aVUV8yaqh3Nn6lEOVe0xvRGg1TIT.SWaPH7SPBC/nE.KOMq'),
(4, 'mnb', '$2b$10$mnc6xGN5TkqcRf2K2O2jj.y.4FZEu9YatcFvjPUdA0V4WUP6udUXK'),
(5, 'salut1', '$2b$10$.ljk//sKAThwxEPA7AG5b.qDgWtpdffJ6AcomArTaGBoJRcSejwL6'),
(6, 'salut2', '$2b$10$UBw/PTjGTA1oYksBWcmVMeqivJpIdF5A4Be0Lh3COfn/P7xfqNk0O'),
(7, '1', '$2b$10$Mao2kMZq4CCRnQfU0fn/n.HNJ6xyy9PQy11sWQjgY/O9lQ3E2MJ/.'),
(8, '2', '$2b$10$pKwdYUCm.WwXz/PAlBNFp.LuZ3Epa/hrVqWGGItwc.AtTb3LgGV3S'),
(9, '0', '$2b$10$mDllFebsAfX0L4ffzZfCIuj8omdHKl20qNTfFMMBRhiz3pBf79wbe'),
(10, '9', '$2b$10$zVsgmMXGlJs8MCIreeC0sOfUJwu/exUIS/36Zn5OQmdgwJCn20U.q'),
(11, '7', '$2b$10$qSCZCCnjaqk7KgbW7oF3TuH8aFkAvKoqQL.VMCMpufz0rxLGh2t/q'),
(12, '8', '$2b$10$0.PVf63zN.W4NtUBIns6x.c/SsOOUyAzBIgQsxQWYce2739FRAOF.'),
(13, 'Caca', '$2b$10$/EfAhKDKzr3ITiaZQRzOHu/cD87AEfc98/aY37qTjoWxlWAzXadnm'),
(14, 'akyz', '$2b$10$5AexJnt3Cx9c4Ih5St9Ihug2Yro5kl4QGIIUij6P94lUKQ3ITR1pG'),
(15, 'ewq', '$2b$10$1jc4rtF1uir8sYqg81SK/uY.3iB7Z.Ac.fdEfngFxH66ZYbhyu02u'),
(16, 'drag', '$2b$10$1sGyX5UkuFkCcp1/249RRO24rlm8HTfOBUqqoeBZ2qZJdyXjmwgV.'),
(26, 'jhg', '$2b$10$0ojD03yN3IlEpupqIpAgienQ5kB9oR.c8.oxW3KITCxgSnP6M1zwi'),
(31, 'hgf', '$2b$10$3QLmqyxEGOuPisX5PFIIWeiSC50O8zdwl66Mjn1i4VLv4p0dOfy.G'),
(40, 'prout', '$2b$10$CkqP9CPSU5q8Fg0BrKLNEesxuujMojmItWKaLSlumG.a0FbHpm4sS');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`idGame`);

--
-- Index pour la table `userasgame`
--
ALTER TABLE `userasgame`
  ADD PRIMARY KEY (`idUserAsGame`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `game`
--
ALTER TABLE `game`
  MODIFY `idGame` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=272;

--
-- AUTO_INCREMENT pour la table `userasgame`
--
ALTER TABLE `userasgame`
  MODIFY `idUserAsGame` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=265;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

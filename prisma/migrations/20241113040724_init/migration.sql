-- CreateTable
CREATE TABLE `Diskon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `diskon` DOUBLE NOT NULL,
    `diskonPromo` DOUBLE NOT NULL,
    `diskonDealer` DOUBLE NOT NULL,
    `tenor` INTEGER NOT NULL,
    `potonganTenor` DOUBLE NOT NULL,
    `idLeasing` INTEGER NOT NULL,
    `idMotor` INTEGER NOT NULL,
    `idLokasi` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Motor` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Leasing` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kota` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Diskon` ADD CONSTRAINT `Diskon_idLeasing_fkey` FOREIGN KEY (`idLeasing`) REFERENCES `Leasing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diskon` ADD CONSTRAINT `Diskon_idMotor_fkey` FOREIGN KEY (`idMotor`) REFERENCES `Motor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diskon` ADD CONSTRAINT `Diskon_idLokasi_fkey` FOREIGN KEY (`idLokasi`) REFERENCES `Kota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

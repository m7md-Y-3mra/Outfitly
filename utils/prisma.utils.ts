import { Prisma } from "@/app/generated/prisma/client";

export const prismaKnownErrorMessage = (err: Prisma.PrismaClientKnownRequestError): string => {
  switch (err.code) {
    case "P2002":
      return "A record with this value already exists (unique constraint failed).";

    case "P2003":
      return "This record cannot be created due to related data.";

    case "P2025":
      return "The requested record does not exist.";

    case "P2001":
      return "The requested record was not found.";

    case "P2014":
      return "Invalid relation. Check your connected records.";

    default:
      return "A database error occurred.";
  }
};

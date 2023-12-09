import React from "react";

export default function dtTimeForHumans(str) {
  return str.replace("T", " ").substring(0, 16);
}

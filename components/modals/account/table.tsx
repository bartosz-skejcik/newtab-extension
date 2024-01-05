import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useUserPreferences } from "@/stores/user-preferences";
import { ChevronDown, Github, Trash, Trello } from "lucide-react";

import Image from "next/image";

type Props = {
    table: any;
    setNewConnectionModalOpen: (prov: "github" | "atlassian") => void;
};

function ConnectionsTable({ table, setNewConnectionModalOpen }: Props) {
    const removeConnection = useUserPreferences(
        (state) => state.removeConnection
    );
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Service</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {table.map((row: any, index: number) => (
                    <TableRow key={index}>
                        <TableCell className="flex items-center justify-center gap-2 py-1 font-medium text-left h-fit">
                            {row.name === "Github" ? (
                                <Github
                                    size={24}
                                    className="w-[1rem] h-[1rem] pt-1"
                                />
                            ) : (
                                <Image
                                    src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/30_Atlassian_logo_logos-512.png"
                                    width={14}
                                    height={14}
                                    alt="Atlassian"
                                />
                            )}
                            <span>{row.name}</span>
                        </TableCell>
                        <TableCell className="pb-3">{row.email}</TableCell>
                        <TableCell className="flex items-center justify-end gap-5 text-right">
                            {/* show the apikey fist 4 characters and the rest are ...... */}
                            <span>
                                {row.apiKey.slice(0, 8) + " • • • • • • • •"}
                            </span>
                            <Button
                                onClick={() => {
                                    removeConnection(row.name);
                                }}
                                variant="outline"
                                size="icon"
                            >
                                <Trash size={16} />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>New connection</TableCell>
                    <TableCell className="flex justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center justify-center gap-2 px-3 py-1 transition duration-200 rounded-md bg-background/50 hover:bg-background/30">
                                    <p>Add</p>
                                    <ChevronDown size={16} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild>
                                    <button
                                        onClick={() => {
                                            setNewConnectionModalOpen(
                                                "atlassian"
                                            );
                                        }}
                                        className="flex items-center justify-start w-full gap-2 cursor-pointer text-start"
                                    >
                                        <Trello
                                            size={24}
                                            className="w-[1rem] h-[1rem]"
                                        />
                                        <p>Atlassian</p>
                                    </button>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <s>
                                        <button
                                            onClick={() => {
                                                setNewConnectionModalOpen(
                                                    "github"
                                                );
                                            }}
                                            disabled
                                            className="flex items-center justify-start w-full gap-2 cursor-pointer cursor-not-allowed text-start"
                                        >
                                            <Github
                                                size={24}
                                                className="w-[1rem] h-[1rem]"
                                            />
                                            <p>GitHub</p>
                                        </button>
                                    </s>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}

export default ConnectionsTable;

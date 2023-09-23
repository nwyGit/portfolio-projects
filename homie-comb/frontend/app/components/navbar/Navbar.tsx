"use client";

import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

const Navbar = () => {
	return (
		<div className="fixed w-full bg-white z-10 shadow-sm">
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className="relative flex flex-row items-center justify-between gap-3 md:gap-0">
						<Logo />
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<Search />
						</div>
						<UserMenu />
					</div>
				</Container>
			</div>
			<Categories />
		</div>
	);
};

export default Navbar;

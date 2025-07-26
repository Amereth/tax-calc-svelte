<script lang="ts">
	import { MONTHS } from '$lib/constants/month'
	import type { Payment } from '$lib/server/schemas/payments'
	import { formatter } from '$lib/utils/formatter'
	import { CheckIcon, XIcon, PenIcon } from 'lucide-svelte'
	import { twMerge } from 'tailwind-merge'

	const { month, payments }: { month: number; payments: Payment[] } = $props()

	const total = $derived(
		payments.reduce((acc, payment) => acc + payment.sum, 0),
	)

	const totalOriginal = $derived(
		payments.reduce(
			(acc, payment) => {
				if (!payment.originalCurrency) return acc
				acc[payment.originalCurrency] += payment.originalSum || 0
				return acc
			},
			{ EUR: 0, USD: 0 },
		),
	)

	let editedPayment: Payment['id'] | undefined = $state()
</script>

<details class={twMerge('transition-colors duration-300 ease-out')}>
	<summary
		class={[
			'text-md border-surface-900 flex justify-between rounded-xl p-2 px-4 font-medium',
		]}
	>
		<div>{MONTHS[month]}</div>
		<div class="flex gap-8">
			<span>
				{formatter('UAH').format(total)}
			</span>
			<span>/</span>
			<span>
				{formatter('EUR').format(totalOriginal.EUR)}
			</span>
			<span>-</span>
			<span>
				{formatter('USD').format(totalOriginal.USD)}
			</span>
		</div>
	</summary>

	<div
		class={twMerge(
			'rounded-xl border-y-2 border-b-0 px-2 pt-2 pb-2',
			'transition-colors duration-300 ease-out',
		)}
	>
		<div class="flex gap-2">
			<div class="flex flex-1 flex-col gap-3">
				{#each payments as payment}
					<div class="flex items-center gap-2">
						<div class="text-xl">{formatter('UAH').format(payment.sum)}</div>
						{#if payment.originalCurrency && payment.originalSum}
							-
							<div class="text-xl">
								{formatter(payment.originalCurrency).format(
									payment.originalSum,
								)}
							</div>
						{/if}
						<button
							type="button"
							class="icon ml-4"
							onclick={() => (editedPayment = payment.id)}
							disabled={editedPayment === payment.id}
						>
							<PenIcon size="16" />
						</button>
						<form action="?/delete" method="post">
							<input type="hidden" name="id" value={payment.id} />
							<button type="submit" class="icon">
								<XIcon size="16" />
							</button>
						</form>
					</div>
				{/each}
			</div>

			<form
				class="flex flex-1 flex-col gap-2"
				method="post"
				action="?/{editedPayment ? 'update' : 'insert'}"
			>
				<input name="id" type="hidden" value={editedPayment} />

				<label class="grid-cols-[auto_1fr_auto]">
					<div>сума</div>
					<input
						name="sum"
						type="text"
						class="block h-9 w-full"
						required
						value={editedPayment
							? payments.find((payment) => payment.id === editedPayment)?.sum
							: ''}
					/>
				</label>

				<label class="grid-cols-[auto_1fr_auto]">
					<div class="">дата</div>
					<input
						name="date"
						type="date"
						class="block h-9 w-full"
						required
						value={editedPayment
							? payments.find((payment) => payment.id === editedPayment)?.date
							: ''}
					/>
				</label>

				<div class="flex gap-2">
					<label for="originalSum" class="grid-cols-[auto_1fr_auto]">
						<div class="whitespace">сума в валюті</div>
						<input
							id="originalSum"
							name="originalSum"
							type="text"
							class="block h-9 w-full"
							value={editedPayment
								? payments.find((payment) => payment.id === editedPayment)
										?.originalSum
								: ''}
						/>
					</label>

					<label>
						<div>орігінальна валюта</div>
						<select
							name="originalCurrency"
							class="mt-auto h-9"
							value={editedPayment
								? payments.find((payment) => payment.id === editedPayment)
										?.originalCurrency
								: ''}
						>
							<option value="EUR">EUR</option>
							<option value="USD">USD</option>
						</select>
					</label>
				</div>

				<div class="flex gap-2">
					<button type="submit" class="icon ml-auto">
						<CheckIcon size="16" />
					</button>
					<button
						type="reset"
						class="icon"
						onclick={() => (editedPayment = undefined)}
					>
						<XIcon size="16" />
					</button>
				</div>
			</form>
		</div>
	</div>
</details>
